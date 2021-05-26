package NoWaiter.ObjectService.services.implementation;

import java.io.IOException;
import java.time.LocalTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.Date;
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
import NoWaiter.ObjectService.entities.WeekDay;
import NoWaiter.ObjectService.entities.WorkDay;
import NoWaiter.ObjectService.entities.WorkTime;
import NoWaiter.ObjectService.repository.ObjectAdminRepository;
import NoWaiter.ObjectService.repository.ObjectRepository;
import NoWaiter.ObjectService.repository.WorkTimeRepository;
import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectWithStatusDTO;
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

	@Override
	public IdentifiableDTO<ObjectDTO> findByObjectAdminId(UUID adminId) {
		return ObjectMapper.MapObjectToIdentifiableObjectDTO(objectAdminRepository.findObjectByAdminId(adminId));
	}

	@Override
	public void updateImage(MultipartFile multipartFile, UUID objectAdminId) throws IOException {

		ObjectAdmin objectAdmin = objectAdminRepository.findById(objectAdminId).get();
		Object object = objectRepository.findById(objectAdmin.getObject().getId()).get();
		System.out.println(env.getProperty("abs-image-path"));
		ImageUtil.saveFile(env.getProperty("abs-image-path"), object.getId().toString() + ".jpg", multipartFile);
		object.setImagePath(env.getProperty("rel-image-path") + "\\" + object.getId().toString() + ".jpg");
		objectRepository.save(object);
	}

	@Override
	public void worktime() {
		System.out.println("TEST");
		List<WorkDay> listaWorkDay = new ArrayList<>();
		
		LocalTime time1= LocalTime.of(15, 00);
		LocalTime time2= LocalTime.of(18, 00);
		
		WorkDay wd1 = new WorkDay(WeekDay.MONDAY, true, time1, time2);
		WorkDay wd2 = new WorkDay(WeekDay.THURSDAY, true, time1, time2);
		WorkDay wd3 = new WorkDay(WeekDay.FRIDAY, false, time1, time2);
		listaWorkDay.add(wd1);
		listaWorkDay.add(wd2);
		listaWorkDay.add(wd3);

		WorkTime wt= new WorkTime(listaWorkDay);
		System.out.println("TEST33");

		workTimeRepository.save(wt);
		
		System.out.println("TEST22");

	}
}
