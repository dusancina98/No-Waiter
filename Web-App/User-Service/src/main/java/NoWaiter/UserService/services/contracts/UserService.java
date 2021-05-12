package NoWaiter.UserService.services.contracts;

import java.util.UUID;

import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;

public interface UserService {

    UUID CreateRestaurantAdmin(ObjectAdminDTO entity);
    
    UUID CreateWaiter(WaiterDTO entity);
    
    Iterable<IdentifiableDTO<ObjectAdminDTO>> FindAllObjectAdmins();
}
