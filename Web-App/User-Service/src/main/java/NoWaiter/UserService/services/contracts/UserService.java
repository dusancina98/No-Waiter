package NoWaiter.UserService.services.contracts;

import NoWaiter.UserService.services.contracts.dto.RestaurantAdminDTO;
import NoWaiter.UserService.services.contracts.dto.UserDTO;

import java.util.UUID;

public interface UserService {

    UUID createRestaurantAdmin(RestaurantAdminDTO entity);
}
