package NoWaiter.ObjectService.services.implementation.util;

import NoWaiter.ObjectService.entities.Address;
import NoWaiter.ObjectService.entities.Contact;
import NoWaiter.ObjectService.entities.Object;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;

import java.util.ArrayList;
import java.util.List;

public class ObjectMapper {

    public static Object MapObjectDTOToObject(ObjectDTO objectDTO){
        if (objectDTO == null) throw new IllegalArgumentException();

        return new Object(objectDTO.Name, new Address(objectDTO.Address), new Contact(objectDTO.PhoneNumber, objectDTO.Email), objectDTO.ImagePath);
    }

    public static IdentifiableDTO<ObjectDTO> MapObjectToIdentifiableObjectDTO(Object object){
        if (object == null) throw new IllegalArgumentException();
        
        return new IdentifiableDTO<ObjectDTO>(object.getId(), new ObjectDTO(object.getName(),
                object.getContact().getEmail(), object.getContact().getPhoneNumber(), object.getImagePath(), object.getAddress().getAddress()));
    }

    public static Iterable<IdentifiableDTO<ObjectDTO>> MapObjectCollectionToIdentifiableObjectDTOCollection(Iterable<Object> objects){
        if (objects == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<ObjectDTO>> retVal = new ArrayList<>();
        objects.forEach((object) -> retVal.add(MapObjectToIdentifiableObjectDTO(object)));

        return retVal;
    }
}
