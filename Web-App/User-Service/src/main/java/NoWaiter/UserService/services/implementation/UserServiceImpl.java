package NoWaiter.UserService.services.implementation;

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

import NoWaiter.UserService.entities.AccountActivation;
import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.entities.ResetPasswordToken;
import NoWaiter.UserService.entities.User;
import NoWaiter.UserService.entities.Waiter;
import NoWaiter.UserService.repository.AccountActivationRepository;
import NoWaiter.UserService.repository.ObjectAdminRepository;
import NoWaiter.UserService.repository.ResetPasswordTokenRepository;
import NoWaiter.UserService.repository.UserRepository;
import NoWaiter.UserService.repository.WaiterRepository;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.RequestEmailDTO;
import NoWaiter.UserService.services.contracts.dto.ResetPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateWaiterDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsed;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;
import NoWaiter.UserService.services.contracts.exceptions.NonExistentUserEmailException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordIsNotStrongException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordsIsNotTheSameException;
import NoWaiter.UserService.services.contracts.exceptions.ResetPasswordTokenExpiredOrUsedException;
import NoWaiter.UserService.services.contracts.exceptions.UserIsActiveException;
import NoWaiter.UserService.services.implementation.util.UserMapper;


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
    public UUID createObjectAdmin(ObjectAdminDTO entity) throws Exception {
        ObjectAdmin restaurantAdmin = UserMapper.MapRestaurantAdminDTOToRestaurantAdmin(entity);
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
	public UUID createWaiter(WaiterDTO entity, UUID objectAdminId) throws ClassFieldValidationException {
		ObjectAdmin objectAdmin = objectAdminRepository.findById(objectAdminId).get();
		Waiter waiter = UserMapper.MapWaiterDTOToWaiter(entity, objectAdmin.getObjectId());	
		waiterRepository.save(waiter);
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

	@Override
	public void resetPassword(ResetPasswordDTO resetPasswordDTO) throws ResetPasswordTokenExpiredOrUsedException, PasswordsIsNotTheSameException, PasswordIsNotStrongException {
		ResetPasswordToken resetPasswordToken = isValidResetPasswordToken(resetPasswordDTO.resetPasswordId);
		
		if(resetPasswordToken==null)
			throw new ResetPasswordTokenExpiredOrUsedException("Reset password token expired or used");
		
		String password = HashAndSaltPasswordIfStrongAndMatching(resetPasswordDTO.password,resetPasswordDTO.passwordRepeat);
		
		User user = userRepository.getOne(resetPasswordToken.getUserId().getId());
		user.setPassword(password);
		userRepository.save(user);
		resetPasswordToken.setUsed(true);
		resetPasswordTokenRepository.save(resetPasswordToken);
	}
	
	private ResetPasswordToken isValidResetPasswordToken(UUID resetPasswordId) {
		ResetPasswordToken resetPasswordToken = resetPasswordTokenRepository.getOne(resetPasswordId);
		
		if(resetPasswordToken.getExpirationDate().before(new Date()) || resetPasswordToken.isUsed())
			return null;
		
		return resetPasswordToken;	
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




}
