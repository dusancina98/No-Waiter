package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class ObjectAdminDTO extends UserDTO {

    public String Address;

    public UUID ObjectId;
    
    public String ObjectName;
    
    public String PhoneNumber;
    
    public ObjectAdminDTO() {
    }

    public ObjectAdminDTO(String email, String name, String surname, UUID objectId, String objectName, String address, String phoneNumber) {
        super(email, name, surname);
        ObjectId = objectId;
        ObjectName = objectName;
        Address = address;
        PhoneNumber = phoneNumber;
    }
}
