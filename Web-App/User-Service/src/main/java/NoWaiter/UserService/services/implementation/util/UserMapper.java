package NoWaiter.UserService.services.implementation.util;

import java.util.ArrayList;
import java.util.List;

import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;

public class UserMapper {

    public static ObjectAdmin MapRestaurantAdminDTOToRestaurantAdmin(ObjectAdminDTO objectAdminDTO){
        if (objectAdminDTO == null) throw new IllegalArgumentException();

        return new ObjectAdmin(objectAdminDTO.Email, "", objectAdminDTO.Name, objectAdminDTO.Surname, objectAdminDTO.ObjectId, objectAdminDTO.ObjectName);
    }
    
    public static IdentifiableDTO<ObjectAdminDTO> MapObjectAdminToIdentifiableObjectAdminDTO(ObjectAdmin objectAdmin){
        if (objectAdmin == null) throw new IllegalArgumentException();

        return new IdentifiableDTO<ObjectAdminDTO>(objectAdmin.getId(), new ObjectAdminDTO(objectAdmin.getEmail(), objectAdmin.getName(),
        		objectAdmin.getSurname(), objectAdmin.getObjectId(), objectAdmin.getObjectName()));
    }

    public static Iterable<IdentifiableDTO<ObjectAdminDTO>> MapObjectAdminCollectionToIdentifiableObjectAdminDTOCollection(Iterable<ObjectAdmin> objectAdmins){
        if (objectAdmins == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<ObjectAdminDTO>> retVal = new ArrayList<>();
        objectAdmins.forEach((object) -> retVal.add(MapObjectAdminToIdentifiableObjectAdminDTO(object)));

        return retVal;
    }

}
