package NoWaiter.ObjectService.services.contracts;

import java.util.UUID;

import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;

public interface ObjectService {

    UUID Create(ObjectDTO entity);
    
    void AddAdminToObject(AddAdminDTO addAdminDTO);

    IdentifiableDTO<ObjectDTO> FindById(UUID id);

    Iterable<IdentifiableDTO<ObjectDTO>> FindAll();
}
