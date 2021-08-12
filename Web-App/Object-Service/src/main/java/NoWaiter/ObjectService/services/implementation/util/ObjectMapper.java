package NoWaiter.ObjectService.services.implementation.util;

import NoWaiter.ObjectService.entities.Address;
import NoWaiter.ObjectService.entities.Contact;
import NoWaiter.ObjectService.entities.Object;
import NoWaiter.ObjectService.entities.WeekDay;
import NoWaiter.ObjectService.entities.WorkDay;
import NoWaiter.ObjectService.entities.WorkTime;
import NoWaiter.ObjectService.services.contracts.dto.CustomerObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectWithStatusDTO;
import NoWaiter.ObjectService.services.contracts.dto.WorkDayDTO;
import NoWaiter.ObjectService.services.contracts.dto.WorkTimeDTO;
import NoWaiter.ObjectService.services.contracts.exceptions.InvalidTimeRangeException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ObjectMapper {

    public static Object MapObjectDTOToObject(ObjectDTO objectDTO, WorkTime workTime) throws InvalidTimeRangeException{
        if (objectDTO == null) throw new IllegalArgumentException();

        return new Object(objectDTO.Name, new Address(objectDTO.Address), new Contact(objectDTO.PhoneNumber, objectDTO.Email), objectDTO.ImagePath, workTime);
    }

    public static IdentifiableDTO<ObjectDTO> MapObjectToIdentifiableObjectDTO(Object object){
        if (object == null) throw new IllegalArgumentException();
        
        return new IdentifiableDTO<ObjectDTO>(object.getId(), new ObjectDTO(object.getName(),
                object.getContact().getEmail(), object.getContact().getPhoneNumber(), object.getImagePath(), object.getAddress().getAddress(), MapWorkTimeToIdentifiableWorkTimeDTO(object.getWorkTime())));
    }

	private static IdentifiableDTO<WorkTimeDTO> MapWorkTimeToIdentifiableWorkTimeDTO(WorkTime workTime) {
        if (workTime == null) throw new IllegalArgumentException();
		
        return new IdentifiableDTO<WorkTimeDTO>(workTime.getId(), new WorkTimeDTO(MapWorkDaysMapToWorkDaysMapDTO(workTime.getWorkDays())));
	}
	
	public static IdentifiableDTO<CustomerObjectDTO> MapObjectToIdentifiableCustomerObjectDTO(Object object){
        if (object == null) throw new IllegalArgumentException();
        
        return new IdentifiableDTO<CustomerObjectDTO>(object.getId(), new CustomerObjectDTO(object.getName(),object.getAddress().getAddress(),object.getImagePath()));
    }

	
	private static Map<WeekDay, WorkDayDTO> MapWorkDaysMapToWorkDaysMapDTO(Map<WeekDay, WorkDay> workDays) {
        if (workDays == null) throw new IllegalArgumentException();
		
        Map<WeekDay, WorkDayDTO> retVal = new HashMap<WeekDay, WorkDayDTO>();

        for (Map.Entry<WeekDay, WorkDay> pair : workDays.entrySet()) {
        	retVal.put(pair.getKey(), MapWorkDayToWorkDayDTO(pair.getValue()));
        }
               
        return retVal;
	}

	private static WorkDayDTO MapWorkDayToWorkDayDTO(WorkDay workDay) {
        if (workDay == null) throw new IllegalArgumentException();

		return new WorkDayDTO(workDay.isWorking(),workDay.getTimeFrom(),workDay.getTimeTo());
	}

	public static Iterable<IdentifiableDTO<ObjectDTO>> MapObjectCollectionToIdentifiableObjectDTOCollection(Iterable<Object> objects){
        if (objects == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<ObjectDTO>> retVal = new ArrayList<>();
        objects.forEach((object) -> retVal.add(MapObjectToIdentifiableObjectDTO(object)));

        return retVal;
    }
    
    public static IdentifiableDTO<ObjectWithStatusDTO> MapObjectToIdentifiableObjectWithStatusDTO(Object object){    	
        if (object == null) throw new IllegalArgumentException();
        
        IdentifiableDTO<WorkTimeDTO> dto = MapWorkTimeToIdentifiableWorkTimeDTO(object.getWorkTime());
        System.out.println("TEST1 " + dto.Id);

        
        return new IdentifiableDTO<ObjectWithStatusDTO>(object.getId(), new ObjectWithStatusDTO(object.getName(),
                object.getContact().getEmail(), object.getContact().getPhoneNumber(), object.getImagePath(), object.getAddress().getAddress(), MapWorkTimeToIdentifiableWorkTimeDTO(object.getWorkTime()), object.isActive(), object.isBlocked()));
    }

    public static Iterable<IdentifiableDTO<ObjectWithStatusDTO>> MapObjectCollectionToIdentifiableObjectWithStatusDTOCollection(Iterable<Object> objects){
        if (objects == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<ObjectWithStatusDTO>> retVal = new ArrayList<>();
        objects.forEach((object) -> retVal.add(MapObjectToIdentifiableObjectWithStatusDTO(object)));

        return retVal;
    }
    
    
    public static Iterable<IdentifiableDTO<CustomerObjectDTO>> MapObjectCollectionToIdentifiableCustomerObjectDTOCollection(Iterable<Object> objects){
        if (objects == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<CustomerObjectDTO>> retVal = new ArrayList<>();
        objects.forEach((object) -> retVal.add(MapObjectToIdentifiableCustomerObjectDTO(object)));

        return retVal;
    }
}
