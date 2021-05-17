package NoWaiter.UserService.entities;

import java.util.UUID;

import javax.persistence.Entity;

@Entity
public class Waiter extends Employee {

    private UUID objectId;
	
	public Waiter() {
		super();
	}

	public Waiter(String email, String password, String name, String surname, String address, String phoneNumber, UUID objectId) {
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
