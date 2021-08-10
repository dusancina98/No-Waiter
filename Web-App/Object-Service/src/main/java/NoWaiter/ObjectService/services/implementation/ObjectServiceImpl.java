package NoWaiter.ObjectService.services.implementation;

import java.io.IOException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import NoWaiter.ObjectService.entities.WeekDay;
import NoWaiter.ObjectService.entities.WorkDay;
import NoWaiter.ObjectService.entities.WorkTime;
import NoWaiter.ObjectService.repository.ObjectAdminRepository;
import NoWaiter.ObjectService.repository.ObjectRepository;
import NoWaiter.ObjectService.repository.WorkTimeRepository;
import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.CustomerObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDetailsDTO;
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
    private ObjectAdminRepository objectAdminRepository;

    @Autowired
	private Environment env;
    
    @Autowired
    private WorkTimeRepository workTimeRepository;
    
    @Override
    public UUID create(ObjectDTO entity) throws InvalidTimeRangeException {
    	WorkTime defaultWorkTime = new WorkTime(generateDefaultWorkDays());
    	workTimeRepository.save(defaultWorkTime);
        Object object = ObjectMapper.MapObjectDTOToObject(entity,defaultWorkTime);
        objectRepository.save(object);
        return object.getId();
    }
    
    private Map<WeekDay, WorkDay> generateDefaultWorkDays() throws InvalidTimeRangeException {
		Map<WeekDay, WorkDay> retVal = new HashMap<WeekDay,WorkDay>();
		retVal.put(WeekDay.MONDAY, new WorkDay(WeekDay.MONDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.TUESDAY, new WorkDay(WeekDay.TUESDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.WEDNESDAY, new WorkDay(WeekDay.WEDNESDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.THURSDAY, new WorkDay(WeekDay.THURSDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.FRIDAY, new WorkDay(WeekDay.FRIDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.SATURDAY, new WorkDay(WeekDay.SATURDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.SUNDAY, new WorkDay(WeekDay.SUNDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		return retVal;
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
	public void worktime() throws InvalidTimeRangeException {
		System.out.println("TEST");
		Map<WeekDay, WorkDay> listaWorkDay = new HashMap<WeekDay, WorkDay>();
		
		LocalTime time1= LocalTime.of(10, 00);
		LocalTime time2= LocalTime.of(22, 00);
		
		LocalTime time3= LocalTime.of(12, 00);
		LocalTime time4= LocalTime.of(23, 00);
		WorkDay wd1 = new WorkDay(WeekDay.MONDAY, true, time1, time2);
		WorkDay wd2 = new WorkDay(WeekDay.TUESDAY, true, time1, time2);
		WorkDay wd3 = new WorkDay(WeekDay.WEDNESDAY, true, time1, time2);
		WorkDay wd4 = new WorkDay(WeekDay.THURSDAY, true, time1, time2);
		WorkDay wd5 = new WorkDay(WeekDay.FRIDAY, true, time3, time4);
		WorkDay wd6 = new WorkDay(WeekDay.SATURDAY, true, time3, time4);
		WorkDay wd7 = new WorkDay(WeekDay.SUNDAY, false, time1, time2);

		WorkTime wt= new WorkTime(listaWorkDay);
		wt.addWorkDay(wd1);
		wt.addWorkDay(wd2);
		wt.addWorkDay(wd3);
		wt.addWorkDay(wd4);
		wt.addWorkDay(wd5);
		wt.addWorkDay(wd6);
		wt.addWorkDay(wd7);

		System.out.println("TEST33");

		workTimeRepository.save(wt);
		
		System.out.println("TEST22");
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
}
