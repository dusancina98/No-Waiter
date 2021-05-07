package NoWaiter.UserService.entities;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class ObjectAdmin extends User{

    private UUID objectId;
    
    private String objectName;

    public ObjectAdmin() {
    }

    public ObjectAdmin(UUID id, String email, String password, String name, String surname, UUID objectId, String objectName) {
        super(id, email, password, name, surname);
        this.objectId = objectId;
        this.objectName = objectName;
    }

    public ObjectAdmin(String email, String password, String name, String surname, UUID objectId, String objectName) {
        super(email, password, name, surname);
        this.objectId = objectId;
        this.objectName = objectName;
    }

    public UUID getObjectId() {
        return objectId;
    }

    public void setObjectId(UUID objectId) {
        this.objectId = objectId;
    }

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}
}
