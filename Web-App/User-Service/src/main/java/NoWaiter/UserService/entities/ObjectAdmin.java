package NoWaiter.UserService.entities;

import javax.persistence.Column;
import javax.persistence.Entity;

import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

import java.util.UUID;

@Entity
public class ObjectAdmin extends User{

	@Column(nullable = false)
    private UUID objectId;
    
	@Column(nullable = false)
    private String objectName;
    
    private String address;
    
	private String phoneNumber;

    public ObjectAdmin() {
    }

    public ObjectAdmin(UUID id, String email, String password, String name, String surname, UUID objectId, String objectName, String address, String phoneNumber) throws ClassFieldValidationException {
        super(id, email, password, name, surname);
        this.objectId = objectId;
        this.objectName = objectName;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public ObjectAdmin(String email, String password, String name, String surname, UUID objectId, String objectName, String address, String phoneNumber) throws ClassFieldValidationException {
        super(email, password, name, surname);
        this.objectId = objectId;
        this.objectName = objectName;
        this.address = address;
        this.phoneNumber = phoneNumber;
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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
}
