package NoWaiter.ObjectService.services.implementation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import NoWaiter.ObjectService.entities.Address;
import NoWaiter.ObjectService.entities.Contact;
import NoWaiter.ObjectService.entities.Object;
import NoWaiter.ObjectService.entities.ObjectAdmin;
import NoWaiter.ObjectService.entities.Table;
import NoWaiter.ObjectService.entities.WorkTime;
import NoWaiter.ObjectService.intercomm.FeedbackClient;
import NoWaiter.ObjectService.intercomm.UserClient;
import NoWaiter.ObjectService.repository.ObjectAdminRepository;
import NoWaiter.ObjectService.repository.ObjectRepository;
import NoWaiter.ObjectService.repository.WorkTimeRepository;
import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.CustomerObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.CustomerObjectDetailsDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDetailsDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectFeedbackDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectWithStatusDTO;
import NoWaiter.ObjectService.services.contracts.dto.UpdateWorkTimeDTO;
import NoWaiter.ObjectService.services.contracts.exceptions.InvalidTimeRangeException;
import NoWaiter.ObjectService.services.implementation.util.ImageUtil;
import NoWaiter.ObjectService.services.implementation.util.ObjectMapper;

@Service
public class ObjectServiceImpl implements ObjectService {

    @Autowired
    private ObjectRepository objectRepository;
    
    @Autowired
    private FeedbackClient feedbackClient;
    
    @Autowired
    private UserClient userClient;
    
    @Autowired
    private ObjectAdminRepository objectAdminRepository;

    @Autowired
	private Environment env;
    
    @Autowired
    private WorkTimeRepository workTimeRepository;
    
    @Override
    public UUID create(ObjectDTO entity) throws InvalidTimeRangeException {
    	WorkTime defaultWorkTime = new WorkTime();
    	workTimeRepository.save(defaultWorkTime);
        Object object = ObjectMapper.MapObjectDTOToObject(entity,defaultWorkTime);
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
		
		if (status == true) {
			object.Block();
			object.Deactivate();
		}
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
		objectAdmin.delete();
		objectAdminRepository.save(objectAdmin);
		Object object = objectRepository.findById(objectAdmin.getObject().getId()).get();
		if(object.getAdmins().isEmpty()) 
			toggleObjectActivation(object.getId(), false);
	}

	@Override
	public IdentifiableDTO<ObjectDTO> findByObjectAdminId(UUID adminId) {
		return ObjectMapper.MapObjectToIdentifiableObjectDTO(objectAdminRepository.findObjectByAdminId(adminId));
	}

	@Override
	public void updateImage(MultipartFile multipartFile, UUID objectAdminId) throws IOException {
		ObjectAdmin objectAdmin = objectAdminRepository.findById(objectAdminId).get();
		Object object = objectRepository.findById(objectAdmin.getObject().getId()).get();
		ImageUtil.saveFile(env.getProperty("rel-image-path"), object.getId().toString() + ".jpg", multipartFile);
		object.setImagePath(env.getProperty("abs-image-path") + "/" + object.getId().toString() + ".jpg");
		objectRepository.save(object);
	}

	@Override
	public void deleteObject(UUID objectId) {
		Object object = objectRepository.findById(objectId).get();
		object.Delete();
		
		for(ObjectAdmin objectAdmin : object.getAdmins())
			deleteObjectAdminHandlingObjectActivation(objectAdmin.getId());
		
		objectRepository.save(object);
		
	}

	@Override
	public void updateWorkTime(UpdateWorkTimeDTO updateWorkTimeDTO) {
		Object object = objectRepository.findById(UUID.fromString(updateWorkTimeDTO.Id)).get();

		object.getWorkTime().Update(updateWorkTimeDTO.WorkTime.EntityDTO.WorkDays);
		
		objectRepository.save(object);
	}

	@Override
	public int getTableNumberByTableIdForResturant(UUID objectId, UUID tableId) {
		Object object = objectRepository.findById(objectId).get();

		for(Table table : object.getTables()) {
			if(table.getId().equals(tableId))
				return table.getNumber();
		}
		
		return 0;
	}
	
	public List<ObjectDetailsDTO> findAllObjectDetailsById(List<UUID> objectIds) {
		List<ObjectDetailsDTO> details = new ArrayList<ObjectDetailsDTO>();
		List<Object> objects = objectRepository.findAllObjectByIds(objectIds);
		
		objects.forEach((object) -> details.add(mapObjectToObjectDetailsDTO(object)));
		return details;
	}
	
	public ObjectDetailsDTO mapObjectToObjectDetailsDTO(Object object) {
		return new ObjectDetailsDTO(object.getId(), object.getName(), object.getImagePath(), object.getAddress().getAddress());
	}

	@Override
	public Iterable<IdentifiableDTO<CustomerObjectDTO>> getObjectsForCustomers() {
		return ObjectMapper.MapObjectCollectionToIdentifiableCustomerObjectDTOCollection(objectRepository.getAllAvailableObjects());
	}

	@Override
	public IdentifiableDTO<CustomerObjectDetailsDTO> getObjectDetailsForCustomer(UUID objectId, String token) {
		boolean isFavourite = userClient.isObjectInFavourites(token, objectId);
		ObjectFeedbackDTO feedbackDTO = feedbackClient.getObjectFeedback(objectId);
		return mapObjectToIdentifiableCustomerObjectDTO(objectRepository.findById(objectId).get(), feedbackDTO.Grade, isFavourite);
	}
	
	private IdentifiableDTO<CustomerObjectDetailsDTO> mapObjectToIdentifiableCustomerObjectDTO(Object object, double grade, boolean isFavourite){
		IdentifiableDTO<CustomerObjectDetailsDTO> identifiableDTO = 
				new IdentifiableDTO<CustomerObjectDetailsDTO>(object.getId(), new CustomerObjectDetailsDTO(object.getName(),object.getAddress().getAddress(),object.getImagePath(), grade, isFavourite, object.getWorkTime().isWorkingNow(), object.getContact().getPhoneNumber(),object.getContact().getEmail(), ObjectMapper.MapWorkTimeToIdentifiableWorkTimeDTO(object.getWorkTime())));
		
		return identifiableDTO;
	}

	@Override
	public Iterable<IdentifiableDTO<CustomerObjectDTO>> getFavouriteObjectsForCustomers(List<UUID> objectIds) {
		Iterable<Object> favourites = objectRepository.getAllAvailableObjectsFromFavourites(objectIds);
		return ObjectMapper.MapObjectCollectionToIdentifiableCustomerObjectDTOCollection(favourites);
	}

	@Override
	public String getObjectName(UUID objectId) {
		return objectRepository.findById(objectId).get().getName();
	}
}
