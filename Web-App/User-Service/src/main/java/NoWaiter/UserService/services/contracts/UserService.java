package NoWaiter.UserService.services.contracts;

import java.util.UUID;

import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;

public interface UserService {

    UUID CreateRestaurantAdmin(ObjectAdminDTO entity);
    
    Iterable<IdentifiableDTO<ObjectAdminDTO>> FindAllObjectAdmins();

	String checkUserExistance(UUID userId);
}
