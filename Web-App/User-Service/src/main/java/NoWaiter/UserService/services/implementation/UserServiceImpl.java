package NoWaiter.UserService.services.implementation;

import NoWaiter.UserService.entities.AccountActivation;
import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.entities.User;
import NoWaiter.UserService.repository.AccountActivationRepository;
import NoWaiter.UserService.repository.ObjectAdminRepository;
import NoWaiter.UserService.repository.UserRepository;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsed;
import NoWaiter.UserService.services.contracts.exceptions.UserIsActiveException;
import NoWaiter.UserService.services.implementation.util.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ObjectAdminRepository objectAdminRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AccountActivationRepository accountActivationRepository;

    @Override
    public UUID CreateRestaurantAdmin(ObjectAdminDTO entity) throws Exception {
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
}
