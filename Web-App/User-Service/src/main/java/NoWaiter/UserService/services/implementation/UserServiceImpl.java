package NoWaiter.UserService.services.implementation;

import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.entities.Waiter;
import NoWaiter.UserService.repository.ObjectAdminRepository;
import NoWaiter.UserService.repository.WaiterRepository;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.implementation.util.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ObjectAdminRepository objectAdminRepository;
    
    @Autowired
    private WaiterRepository waiterRepository;

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
	public UUID CreateWaiter(WaiterDTO entity) {
		Waiter waiter = UserMapper.MapWaiterDTOToWaiter(entity);
		waiterRepository.save(waiter);
		return waiter.getId();
	}
}
