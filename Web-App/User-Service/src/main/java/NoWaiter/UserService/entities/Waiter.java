package NoWaiter.UserService.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;

import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

@Entity
public class Waiter extends Employee {

	@Column(nullable = false)
    private UUID objectId;
	
	public Waiter() {
		super();
	}

	public Waiter(String email, String password, String name, String surname, String address, String phoneNumber, UUID objectId) throws ClassFieldValidationException {
		super(email, password, name, surname, address, phoneNumber);
		this.objectId = objectId;
	}

	public UUID getObjectId() {
		return objectId;
	}

	public void setObjectId(UUID objectId) {
		this.objectId = objectId;
	}
}
