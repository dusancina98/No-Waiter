package NoWaiter.UserService.services.implementation;

import NoWaiter.UserService.entities.AccountActivation;
import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.entities.ResetPasswordToken;
import NoWaiter.UserService.entities.User;
import NoWaiter.UserService.repository.AccountActivationRepository;
import NoWaiter.UserService.repository.ObjectAdminRepository;
import NoWaiter.UserService.repository.ResetPasswordTokenRepository;
import NoWaiter.UserService.repository.UserRepository;
import NoWaiter.UserService.entities.Waiter;
import NoWaiter.UserService.repository.WaiterRepository;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.RequestEmailDTO;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsed;
import NoWaiter.UserService.services.contracts.exceptions.NonExistentUserEmailException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordIsNotStrongException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordsIsNotTheSameException;
import NoWaiter.UserService.services.contracts.exceptions.UserIsActiveException;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.implementation.util.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.mail.MessagingException;

import java.util.ArrayList;

import javax.transaction.Transactional;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ObjectAdminRepository objectAdminRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AccountActivationRepository accountActivationRepository;
    
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
    public UUID CreateObjectAdmin(ObjectAdminDTO entity) throws Exception {
        ObjectAdmin restaurantAdmin = UserMapper.MapRestaurantAdminDTOToRestaurantAdmin(entity);
        objectAdminRepository.save(restaurantAdmin);
        createActivationLink(restaurantAdmin.getId());
        return restaurantAdmin.getId();
    }

	@Override
	public Iterable<IdentifiableDTO<ObjectAdminDTO>> FindAllObjectAdmins() {
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
				
		AccountActivation accountActivation = new AccountActivation(user, new Date(System.currentTimeMillis()));
		accountActivationRepository.save(accountActivation);
		
		try {
			emailService.sendActivationLinkAsync(user, accountActivation.getId());
		} catch (MailException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void activateUser(UUID activationId) throws ActivationLinkExpiredOrUsed {
		AccountActivation accountActivation = isValidAccountActivationLink(activationId);
		if(accountActivation==null)
			throw new ActivationLinkExpiredOrUsed("User was activated");
				
		
		User user = userRepository.getOne(accountActivation.getUserId().getId());
		user.setActive(true);
		userRepository.save(user);
		accountActivation.setUsed(true);
		accountActivationRepository.save(accountActivation);
	}

	private AccountActivation isValidAccountActivationLink(UUID activationId) {
		AccountActivation accountActivation = accountActivationRepository.getOne(activationId);
		
		if(accountActivation.getExpirationDate().before(new Date()) || accountActivation.isUsed())
			return null;
		
		return accountActivation;
	}

	@Override
	public UUID isUserFirstLogin(UUID activationId) {
		AccountActivation accountActivation = accountActivationRepository.getOne(activationId);

		List<AccountActivation> accountActivations =  accountActivationRepository.getUsedActivationsForUser(accountActivation.getUserId().getId());
		
		if(accountActivations.size()==0) {
			accountActivation.setUsed(true);
			accountActivationRepository.save(accountActivation);
			return accountActivation.getUserId().getId();

		}
		else
			return null;
	}

	@Override
	public void changeFirstPassword(ChangeFirstPasswordDTO changeFirstPasswordDTO) throws PasswordsIsNotTheSameException, PasswordIsNotStrongException {
		String newPassword = HashAndSaltPasswordIfStrongAndMatching(changeFirstPasswordDTO.password,changeFirstPasswordDTO.repeatedPassword);
		
		User user= userRepository.getOne(changeFirstPasswordDTO.userId);
		user.setPassword(newPassword);
		user.setActive(true);
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
	public UUID CreateWaiter(WaiterDTO entity) {
		Waiter waiter = UserMapper.MapWaiterDTOToWaiter(entity);
		waiterRepository.save(waiter);
		return waiter.getId();
	}

	@Override
	public void UpdateObjectAdmin(IdentifiableDTO<UpdateObjectAdminRequestDTO> entity) {

		ObjectAdmin objectAdmin = objectAdminRepository.findById(entity.Id).get();
		objectAdmin.setAddress(entity.EntityDTO.Address);
		objectAdmin.setName(entity.EntityDTO.Name);
		objectAdmin.setSurname(entity.EntityDTO.Surname);
		objectAdmin.setPhoneNumber(entity.EntityDTO.PhoneNumber);
		objectAdminRepository.save(objectAdmin);
	}

	@Override
	@Transactional
	public void UpdateObjects(UserClientObjectDTO entity) {
		
		ArrayList<ObjectAdmin> objectAdmins = (ArrayList<ObjectAdmin>) objectAdminRepository.findByObjectId(entity.Id);
		for (ObjectAdmin objectAdmin : objectAdmins) {
			objectAdmin.setObjectName(entity.Name);
		}
		
		objectAdminRepository.saveAll(objectAdmins);
	}

	@Override
	public void resetPasswordLinkRequest(RequestEmailDTO requestEmailDTO) throws NonExistentUserEmailException {
		User user = userRepository.findByEmail(requestEmailDTO.email);
		
		if(user==null)
			throw new NonExistentUserEmailException("User with this email not not exist");
		
		ResetPasswordToken newResetPasswordToken = new ResetPasswordToken(user, new Date(System.currentTimeMillis()));
		resetPasswordTokenRepository.save(newResetPasswordToken);
		
		try {
			emailService.sendResetPasswordLinkAsync(user, newResetPasswordToken.getId());
		} catch (MailException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
