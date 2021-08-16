package NoWaiter.ObjectService.services.contracts;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.CustomerObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.CustomerObjectDetailsDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDetailsDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectWithStatusDTO;
import NoWaiter.ObjectService.services.contracts.dto.UpdateWorkTimeDTO;
import NoWaiter.ObjectService.services.contracts.exceptions.InvalidTimeRangeException;

public interface ObjectService {

    UUID create(ObjectDTO entity) throws InvalidTimeRangeException;
    
    void updateImage(MultipartFile multipartFile, UUID objectAdminId) throws IOException;
    
    void update(IdentifiableDTO<ObjectDTO> entity);
    
    void addAdminToObject(AddAdminDTO addAdminDTO);
    
    void deleteObjectAdminHandlingObjectActivation(UUID objectAdminId);
    
    List<ObjectDetailsDTO> findAllObjectDetailsById(List<UUID> objectIds);

    IdentifiableDTO<ObjectDTO> findById(UUID id);
        
    IdentifiableDTO<ObjectDTO> findByObjectAdminId(UUID adminId);
    
    Iterable<IdentifiableDTO<ObjectWithStatusDTO>> findAllForAdmin();
    
    void toggleObjectBlock(UUID id, boolean status);
    
    void toggleObjectActivation(UUID id, boolean status);

	void deleteObject(UUID objectId);

	void updateWorkTime(UpdateWorkTimeDTO updateWorkTimeDTO);

	int getTableNumberByTableIdForResturant(UUID objectId, UUID tableId);

	Iterable<IdentifiableDTO<CustomerObjectDTO>> getObjectsForCustomers();

	Iterable<IdentifiableDTO<CustomerObjectDTO>> getFavouriteObjectsForCustomers(List<UUID> objectIds);
	
	IdentifiableDTO<CustomerObjectDetailsDTO> getObjectDetailsForCustomer(UUID objectId, String token);

	String getObjectName(UUID objectId);
}
