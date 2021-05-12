package NoWaiter.ObjectService.services.contracts;

import java.util.UUID;

import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectWithStatusDTO;

public interface ObjectService {

    UUID Create(ObjectDTO entity);
    
    void AddAdminToObject(AddAdminDTO addAdminDTO);

    IdentifiableDTO<ObjectDTO> FindById(UUID id);

    Iterable<IdentifiableDTO<ObjectWithStatusDTO>> FindAllForAdmin();
    
    void ToggleObjectBlock(UUID id, boolean status);
    
    void ToggleObjectActivation(UUID id, boolean status);
}
