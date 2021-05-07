package NoWaiter.UserService.services.contracts;

import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.UserDTO;

import java.util.UUID;

public interface UserService {

    UUID createRestaurantAdmin(ObjectAdminDTO entity);
}
