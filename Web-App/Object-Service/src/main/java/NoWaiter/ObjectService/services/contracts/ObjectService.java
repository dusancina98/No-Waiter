package NoWaiter.ObjectService.services.contracts;

import java.io.IOException;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectWithStatusDTO;
import NoWaiter.ObjectService.services.contracts.exceptions.InvalidTimeRangeException;

public interface ObjectService {

    UUID create(ObjectDTO entity) throws InvalidTimeRangeException;
    
    void updateImage(MultipartFile multipartFile, UUID objectAdminId) throws IOException;
    
    void update(IdentifiableDTO<ObjectDTO> entity);
    
    void addAdminToObject(AddAdminDTO addAdminDTO);
    
    void deleteObjectAdminHandlingObjectActivation(UUID objectAdminId);

    IdentifiableDTO<ObjectDTO> findById(UUID id);
        
    IdentifiableDTO<ObjectDTO> findByObjectAdminId(UUID adminId);
    
    Iterable<IdentifiableDTO<ObjectWithStatusDTO>> findAllForAdmin();
    
    void toggleObjectBlock(UUID id, boolean status);
    
    void toggleObjectActivation(UUID id, boolean status);

	void worktime() throws InvalidTimeRangeException;
}
