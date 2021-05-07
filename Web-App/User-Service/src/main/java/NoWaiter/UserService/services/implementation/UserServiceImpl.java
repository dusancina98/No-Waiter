package NoWaiter.UserService.services.implementation;

import NoWaiter.UserService.entities.RestaurantAdmin;
import NoWaiter.UserService.repository.RestaurantAdminRepository;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.RestaurantAdminDTO;
import NoWaiter.UserService.services.implementation.util.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private RestaurantAdminRepository restaurantAdminRepository;

    @Override
    public UUID createRestaurantAdmin(RestaurantAdminDTO entity) {
        RestaurantAdmin restaurantAdmin = UserMapper.MapRestaurantAdminDTOToRestaurantAdmin(entity);
        restaurantAdminRepository.save(restaurantAdmin);
        return restaurantAdmin.getId();
    }
}
