package NoWaiter.ObjectService.services.contracts;

import java.util.UUID;

import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectWithStatusDTO;

public interface ObjectService {

    UUID create(ObjectDTO entity);
    
    void update(IdentifiableDTO<ObjectDTO> entity);
    
    void addAdminToObject(AddAdminDTO addAdminDTO);
    
    void deleteObjectAdminHandlingObjectActivation(UUID objectAdminId);

    IdentifiableDTO<ObjectDTO> findById(UUID id);

    Iterable<IdentifiableDTO<ObjectWithStatusDTO>> findAllForAdmin();
    
    void toggleObjectBlock(UUID id, boolean status);
    
    void toggleObjectActivation(UUID id, boolean status);
}
