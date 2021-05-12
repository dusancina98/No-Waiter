package NoWaiter.UserService.services.contracts;

import java.util.UUID;

import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;

public interface UserService {

    UUID CreateObjectAdmin(ObjectAdminDTO entity);
    
    void UpdateObjectAdmin(IdentifiableDTO<UpdateObjectAdminRequestDTO> entity);
    
    void UpdateObjects(UserClientObjectDTO entity);
    
    UUID CreateWaiter(WaiterDTO entity);
    
    Iterable<IdentifiableDTO<ObjectAdminDTO>> FindAllObjectAdmins();
}
