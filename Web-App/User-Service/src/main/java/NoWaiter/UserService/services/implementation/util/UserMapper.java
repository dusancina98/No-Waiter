package NoWaiter.UserService.services.implementation.util;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.entities.Waiter;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;

public class UserMapper {

    public static ObjectAdmin MapRestaurantAdminDTOToRestaurantAdmin(ObjectAdminDTO objectAdminDTO){
        if (objectAdminDTO == null) throw new IllegalArgumentException();

        return new ObjectAdmin(objectAdminDTO.Email, "", objectAdminDTO.Name, objectAdminDTO.Surname, objectAdminDTO.ObjectId, objectAdminDTO.ObjectName, objectAdminDTO.Address, objectAdminDTO.PhoneNumber);
    }
    
    public static IdentifiableDTO<ObjectAdminDTO> MapObjectAdminToIdentifiableObjectAdminDTO(ObjectAdmin objectAdmin){
        if (objectAdmin == null) throw new IllegalArgumentException();

        return new IdentifiableDTO<ObjectAdminDTO>(objectAdmin.getId(), new ObjectAdminDTO(objectAdmin.getEmail(), objectAdmin.getName(),
        		objectAdmin.getSurname(), objectAdmin.getObjectId(), objectAdmin.getObjectName(), objectAdmin.getAddress(), objectAdmin.getPhoneNumber()));
    }

    public static Iterable<IdentifiableDTO<ObjectAdminDTO>> MapObjectAdminCollectionToIdentifiableObjectAdminDTOCollection(Iterable<ObjectAdmin> objectAdmins){
        if (objectAdmins == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<ObjectAdminDTO>> retVal = new ArrayList<>();
        objectAdmins.forEach((object) -> retVal.add(MapObjectAdminToIdentifiableObjectAdminDTO(object)));

        return retVal;
    }

    public static Waiter MapWaiterDTOToWaiter(WaiterDTO waiterDTO, UUID objectId) {
    	if (waiterDTO == null) throw new IllegalArgumentException();
    	
    	return new Waiter(waiterDTO.Email, "", waiterDTO.Name, waiterDTO.Surname, waiterDTO.Address, waiterDTO.PhoneNumber, objectId);
    }
   
}
