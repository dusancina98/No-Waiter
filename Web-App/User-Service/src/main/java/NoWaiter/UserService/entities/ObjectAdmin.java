package NoWaiter.UserService.entities;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class ObjectAdmin extends User{

    private UUID objectId;

    public ObjectAdmin() {
    }

    public ObjectAdmin(UUID id, String email, String password, String name, String surname, UUID objectId) {
        super(id, email, password, name, surname);
        this.objectId = objectId;
    }

    public ObjectAdmin(String email, String password, String name, String surname, UUID objectId) {
        super(email, password, name, surname);
        this.objectId = objectId;
    }

    public UUID getObjectId() {
        return objectId;
    }

    public void setObjectId(UUID objectId) {
        this.objectId = objectId;
    }
}
