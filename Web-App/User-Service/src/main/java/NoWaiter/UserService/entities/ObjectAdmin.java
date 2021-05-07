package NoWaiter.UserService.entities;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class ObjectAdmin extends User{

    private UUID objectId;
    
    private String objectName;
    
    private String address;

    public ObjectAdmin() {
    }

    public ObjectAdmin(UUID id, String email, String password, String name, String surname, UUID objectId, String objectName, String address) {
        super(id, email, password, name, surname);
        this.objectId = objectId;
        this.objectName = objectName;
        this.address = address;
    }

    public ObjectAdmin(String email, String password, String name, String surname, UUID objectId, String objectName, String address) {
        super(email, password, name, surname);
        this.objectId = objectId;
        this.objectName = objectName;
        this.address = address;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
