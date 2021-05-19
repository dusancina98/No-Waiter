package NoWaiter.ObjectService.services.implementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NoWaiter.ObjectService.entities.Address;
import NoWaiter.ObjectService.entities.Contact;
import NoWaiter.ObjectService.entities.Object;
import NoWaiter.ObjectService.entities.ObjectAdmin;
import NoWaiter.ObjectService.repository.ObjectAdminRepository;
import NoWaiter.ObjectService.repository.ObjectRepository;
import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectWithStatusDTO;
import NoWaiter.ObjectService.services.implementation.util.ObjectMapper;

@Service
public class ObjectServiceImpl implements ObjectService {

    @Autowired
    private ObjectRepository objectRepository;
    
    @Autowired
    private ObjectAdminRepository objectAdminRepository;

    @Override
    public UUID create(ObjectDTO entity) {
        Object object = ObjectMapper.MapObjectDTOToObject(entity);
        objectRepository.save(object);
        return object.getId();
    }

    @Override
    public IdentifiableDTO<ObjectDTO> findById(UUID id) {
        return ObjectMapper.MapObjectToIdentifiableObjectDTO(objectRepository.findById(id).get());
    }


	@Override
	public void addAdminToObject(AddAdminDTO addAdminDTO) {
		
		Object object = objectRepository.findById(addAdminDTO.ObjectId).get();
		ObjectAdmin objectAdmin = new ObjectAdmin(addAdminDTO.AdminId, object);
		objectAdminRepository.save(objectAdmin);
	}

	@Override
	public Iterable<IdentifiableDTO<ObjectWithStatusDTO>> findAllForAdmin() {
        return ObjectMapper.MapObjectCollectionToIdentifiableObjectWithStatusDTOCollection(objectRepository.findAll());

	}

	@Override
	public void toggleObjectActivation(UUID id, boolean status) {
		
		Object object = objectRepository.findById(id).get();
		
		if (status == true) object.Activate();
		else object.Deactivate();
		
		objectRepository.save(object);
	}

	@Override
	public void toggleObjectBlock(UUID id, boolean status) {
		
		Object object = objectRepository.findById(id).get();
		
		if (status == true) object.Block();
		else object.Unblock();
		
		objectRepository.save(object);
		
	}

	@Override
	public void update(IdentifiableDTO<ObjectDTO> entity) {

		Object object = objectRepository.findById(entity.Id).get();
		object.setAddress(new Address(entity.EntityDTO.Address));
		object.setContact(new Contact(entity.EntityDTO.PhoneNumber, entity.EntityDTO.Email));
		object.setImagePath(entity.EntityDTO.ImagePath);
		object.setName(entity.EntityDTO.Name);
		
		objectRepository.save(object);
	}

	@Override
	public void deleteObjectAdminHandlingObjectActivation(UUID objectAdminId) {
		
		ObjectAdmin objectAdmin = objectAdminRepository.findById(objectAdminId).get();
		objectAdminRepository.deleteById(objectAdminId);
		Object object = objectRepository.findById(objectAdmin.getObject().getId()).get();
		if(object.getAdmins().isEmpty()) 
			toggleObjectActivation(object.getId(), false);
	}
}
