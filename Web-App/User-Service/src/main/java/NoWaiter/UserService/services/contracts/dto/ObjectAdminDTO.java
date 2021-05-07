package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class ObjectAdminDTO extends UserDTO {

    public UUID ObjectId;
    
    public String ObjectName;

    public ObjectAdminDTO() {
    }

    public ObjectAdminDTO(String email, String name, String surname, UUID objectId, String objectName) {
        super(email, name, surname);
        ObjectId = objectId;
        ObjectName = objectName;
    }
}
