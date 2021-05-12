package NoWaiter.UserService.services.implementation;

import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.repository.ObjectAdminRepository;
import NoWaiter.UserService.repository.UserRepository;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.implementation.util.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ObjectAdminRepository objectAdminRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public UUID CreateRestaurantAdmin(ObjectAdminDTO entity) {
        ObjectAdmin restaurantAdmin = UserMapper.MapRestaurantAdminDTOToRestaurantAdmin(entity);
        objectAdminRepository.save(restaurantAdmin);
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
}
