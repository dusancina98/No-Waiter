package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class ObjectAdminDTO extends UserDTO {

    public UUID ObjectId;

    public ObjectAdminDTO() {
    }

    public ObjectAdminDTO(String email, String name, String surname, UUID objectId) {
        super(email, name, surname);
        ObjectId = objectId;
    }
}
