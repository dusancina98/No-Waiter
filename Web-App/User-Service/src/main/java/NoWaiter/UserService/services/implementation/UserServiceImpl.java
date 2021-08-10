package NoWaiter.UserService.services.implementation;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import NoWaiter.UserService.entities.AccountActivationToken;
import NoWaiter.UserService.entities.Authority;
import NoWaiter.UserService.entities.Customer;
import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.entities.ResetPasswordToken;
import NoWaiter.UserService.entities.User;
import NoWaiter.UserService.entities.Waiter;
import NoWaiter.UserService.repository.AccountActivationTokenRepository;
import NoWaiter.UserService.repository.CustomerRepository;
import NoWaiter.UserService.repository.ObjectAdminRepository;
import NoWaiter.UserService.repository.ResetPasswordTokenRepository;
import NoWaiter.UserService.repository.UserRepository;
import NoWaiter.UserService.repository.WaiterRepository;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.CustomerDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.RequestEmailDTO;
import NoWaiter.UserService.services.contracts.dto.ResetPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateWaiterDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsedException;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;
import NoWaiter.UserService.services.contracts.exceptions.NonExistentUserEmailException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordIsNotStrongException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordsIsNotTheSameException;
import NoWaiter.UserService.services.contracts.exceptions.ResetPasswordTokenExpiredOrUsedException;
import NoWaiter.UserService.services.contracts.exceptions.TokenNotFoundException;
import NoWaiter.UserService.services.contracts.exceptions.UserIsActiveException;
import NoWaiter.UserService.services.implementation.util.UserMapper;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ObjectAdminRepository objectAdminRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private AccountActivationTokenRepository accountActivationTokenRepository;
    
    @Autowired
    private EmailServiceImpl emailService;
    
    @Autowired
    private WaiterRepository waiterRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private ResetPasswordTokenRepository resetPasswordTokenRepository;
    
    @Bean
    PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Override
    public UUID createObjectAdmin(ObjectAdminDTO entity) throws Exception {
        ObjectAdmin restaurantAdmin = UserMapper.MapRestaurantAdminDTOToRestaurantAdmin(entity);
        restaurantAdmin.addAuthority(new Authority(UUID.fromString("563e9925-cff6-42b7-99fa-6b1235f67655"), "ROLE_OBJADMIN"));
        objectAdminRepository.save(restaurantAdmin);
        createActivationLink(restaurantAdmin.getId());
        return restaurantAdmin.getId();
    }

	@Override
	public Iterable<IdentifiableDTO<ObjectAdminDTO>> findAllObjectAdmins() {
		return UserMapper.MapObjectAdminCollectionToIdentifiableObjectAdminDTOCollection(objectAdminRepository.findAll());
	}

	@Override
	public String checkUserExistance(UUID userId) {
		return userRepository.getOne(userId).getEmail();
	}
	
	@Override
	public void createActivationLink(UUID userId) throws Exception {
		User user = userRepository.getOne(userId);
		if(user.isActive())
			throw new UserIsActiveException("User was activated");	

		AccountActivationToken accountActivation = new AccountActivationToken(user.getId(), new Date(System.currentTimeMillis()));
		accountActivationTokenRepository.save(accountActivation);
		
		try {
			emailService.sendActivationLinkAsync(user, accountActivation.getToken());
		} catch (MailException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void activateUser(String token) throws ActivationLinkExpiredOrUsedException, TokenNotFoundException {
		AccountActivationToken accountActivation = isValidAccountActivationLink(token);
		
		User user = userRepository.getOne(accountActivation.getUserId());
		user.setActive(true);
		userRepository.save(user);
		accountActivation.setUsed(true);
		accountActivationTokenRepository.save(accountActivation);
	}

	@Override
	public AccountActivationToken isValidAccountActivationLink(String token) throws TokenNotFoundException, ActivationLinkExpiredOrUsedException {
		AccountActivationToken accountActivationToken = accountActivationTokenRepository.findToken(token);
		
		if(accountActivationToken==null)
			throw new TokenNotFoundException("Token not found");
		
		if(accountActivationToken.getExpirationDate().before(new Date()) || accountActivationToken.isUsed()) 
			throw new ActivationLinkExpiredOrUsedException("Token expired or used");
				
		return accountActivationToken;
	}

	@Override
	public UUID isUserFirstLogin(String token) {
		AccountActivationToken accountActivation = accountActivationTokenRepository.findToken(token);

		List<AccountActivationToken> accountActivations =  accountActivationTokenRepository.getUsedActivationsForUser(accountActivation.getUserId());
		
		if(accountActivations.size()==0) 
			return accountActivation.getUserId();
		else
			return null;
	}

	@Override
	public void changeFirstPassword(ChangeFirstPasswordDTO changeFirstPasswordDTO) throws PasswordsIsNotTheSameException, PasswordIsNotStrongException, ActivationLinkExpiredOrUsedException, TokenNotFoundException {
		String newPassword = HashAndSaltPasswordIfStrongAndMatching(changeFirstPasswordDTO.password,changeFirstPasswordDTO.repeatedPassword);
		
		AccountActivationToken token= isValidAccountActivationLink(changeFirstPasswordDTO.token);
		
		User user= userRepository.getOne(changeFirstPasswordDTO.userId);
		user.setPassword(newPassword);
		user.setActive(true);
		token.setUsed(true);
		accountActivationTokenRepository.save(token);
		userRepository.save(user);
	}
	
	private String HashAndSaltPasswordIfStrongAndMatching(String password, String repeatedPassword) throws PasswordsIsNotTheSameException, PasswordIsNotStrongException {
		
		if(!password.equals(repeatedPassword))
			throw new PasswordsIsNotTheSameException("Difference passwords");
		
		if(password.matches("^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[^!@#$%^&*(),.?\":{}|<>~'_+=]*)$"))
			throw new PasswordIsNotStrongException("password must contain minimum eight characters, at least one capital letter, one number and one special character");
				
		return passwordEncoder.encode(password);
	}
	
	@Override
	public UUID createWaiter(WaiterDTO entity, UUID objectAdminId) throws Exception {
		ObjectAdmin objectAdmin = objectAdminRepository.findById(objectAdminId).get();
		Waiter waiter = UserMapper.MapWaiterDTOToWaiter(entity, objectAdmin.getObjectId());	
		waiter.addAuthority(new Authority(UUID.fromString("f98f5538-4d52-4e3e-bae3-598e523a6222"), "ROLE_WAITER"));
		waiterRepository.save(waiter);
		createActivationLink(waiter.getId());
		return waiter.getId();
	}

	@Override
	public void updateObjectAdmin(IdentifiableDTO<UpdateObjectAdminRequestDTO> entity) throws ClassFieldValidationException {
		
		ObjectAdmin objectAdmin = objectAdminRepository.findById(entity.Id).get();
		objectAdmin.setAddress(entity.EntityDTO.Address);
		objectAdmin.setName(entity.EntityDTO.Name);
		objectAdmin.setSurname(entity.EntityDTO.Surname);
		objectAdmin.setPhoneNumber(entity.EntityDTO.PhoneNumber);
		objectAdmin.validate();
		objectAdminRepository.save(objectAdmin);
	}

	@Override
	@Transactional
	public void updateObjects(UserClientObjectDTO entity) {
		
		ArrayList<ObjectAdmin> objectAdmins = (ArrayList<ObjectAdmin>) objectAdminRepository.findByObjectId(entity.Id);
		for (ObjectAdmin objectAdmin : objectAdmins) {
			objectAdmin.setObjectName(entity.Name);
		}
		
		objectAdminRepository.saveAll(objectAdmins);
	}

	@Override
	public void resetPasswordLinkRequest(RequestEmailDTO requestEmailDTO) throws NonExistentUserEmailException, NoSuchAlgorithmException {
		User user = userRepository.findByEmail(requestEmailDTO.email);
		
		if(user==null)
			throw new NonExistentUserEmailException("User with this email not not exist");
		
		ResetPasswordToken newResetPasswordToken = new ResetPasswordToken(user, new Date(System.currentTimeMillis()));
		resetPasswordTokenRepository.save(newResetPasswordToken);
		
		try {
			emailService.sendResetPasswordLinkAsync(user, newResetPasswordToken.getToken());
		} catch (MailException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Override
	public void resetPassword(ResetPasswordDTO resetPasswordDTO) throws ResetPasswordTokenExpiredOrUsedException, PasswordsIsNotTheSameException, PasswordIsNotStrongException, TokenNotFoundException {
		String password = HashAndSaltPasswordIfStrongAndMatching(resetPasswordDTO.password,resetPasswordDTO.passwordRepeat);
		
		ResetPasswordToken resetPasswordToken = isValidResetPasswordToken(resetPasswordDTO.token);
				
		User user = userRepository.getOne(resetPasswordToken.getUserId().getId());
		user.setPassword(password);
		userRepository.save(user);
		resetPasswordToken.setUsed(true);
		resetPasswordTokenRepository.save(resetPasswordToken);
	}
	

	@Override
	public Iterable<IdentifiableDTO<WaiterDTO>> findAllWaiters(UUID objectAdminId) {
		ObjectAdmin objectAdmin = objectAdminRepository.findById(objectAdminId).get();
		return UserMapper.MapWaiterCollectionToIdentifiableWaiterDTOCollection(waiterRepository.findAllByObjectId(objectAdmin.getObjectId()));
	}


	@Override
	public void updateWaiter(IdentifiableDTO<UpdateWaiterDTO> entity) throws ClassFieldValidationException {
		Waiter waiter = waiterRepository.findById(entity.Id).get();
		waiter.setAddress(entity.EntityDTO.Address);
		waiter.setName(entity.EntityDTO.Name);
		waiter.setSurname(entity.EntityDTO.Surname);
		waiter.setPhoneNumber(entity.EntityDTO.PhoneNumber);
		waiter.validate();
		waiterRepository.save(waiter);
	}

	@Override
	public void deleteObjectAdmin(UUID objectAdminId) {
		ObjectAdmin objectAdmin = objectAdminRepository.findById(objectAdminId).get();
		
		objectAdmin.delete();
		
		objectAdminRepository.save(objectAdmin);
	}


	@Override
	public ResetPasswordToken isValidResetPasswordToken(String token) throws TokenNotFoundException, ResetPasswordTokenExpiredOrUsedException {
		ResetPasswordToken resetPasswordToken = resetPasswordTokenRepository.findToken(token);
		if(resetPasswordToken==null)
			throw new TokenNotFoundException("Token not found");
		
		if(resetPasswordToken.getExpirationDate().before(new Date()) || resetPasswordToken.isUsed())
			throw new ResetPasswordTokenExpiredOrUsedException("Token expired or used");
		
		return resetPasswordToken;	
	}

	@Override
	public UUID findObjectIdByWaiterId(UUID waiterId) {
		return waiterRepository.findById(waiterId).get().getObjectId();
	}

	@Override
	public void deleteWaiter(UUID waiterId) {
		Waiter waiter = waiterRepository.findById(waiterId).get();
		
		waiter.delete();
		
		waiterRepository.save(waiter);		
	}

	@Override
	public void deleteObjectWorkers(UUID objectId) {
		List<Waiter> objectWaiters = waiterRepository.findAllByObjectId(objectId);
		
		for(Waiter waiter : objectWaiters) {
			waiter.delete();
			waiterRepository.save(waiter);
		}
		
		List<ObjectAdmin> objectAdmins = objectAdminRepository.findByObjectId(objectId);
		
		for(ObjectAdmin objectAdmin : objectAdmins) {
			objectAdmin.delete();
			objectAdminRepository.save(objectAdmin);
		}
	}

	@Override
	public UUID createCustomer(CustomerDTO entity) throws ClassFieldValidationException, Exception {
	    Customer customer = UserMapper.MapCustomerDTOToCustomer(entity);
	    customer.addAuthority(new Authority(UUID.fromString("f98f5538-4d52-4e3e-bae3-598e523a6111"), "ROLE_CUSTOMER"));
        customerRepository.save(customer);
        createActivationLink(customer.getId());
        return customer.getId();
	}
	
	
}
