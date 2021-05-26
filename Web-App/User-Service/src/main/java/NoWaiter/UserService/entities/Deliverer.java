package NoWaiter.UserService.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

@Entity
public class Deliverer extends Worker{

    @Enumerated(EnumType.STRING)
	@Column(name="status", nullable = false)
	private DelivererStatus delivererStatus;
	
	public Deliverer() {
    }
	
	public Deliverer(UUID id, String email, String password, String name, String surname, UUID objectId, String objectName, String address, String phoneNumber, DelivererStatus delivererStatus) throws ClassFieldValidationException {
        super(id, email, password, name, surname, phoneNumber);
        this.delivererStatus=delivererStatus;
    }

    public Deliverer(String email, String password, String name, String surname, String phoneNumber, DelivererStatus delivererStatus) throws ClassFieldValidationException {
        super(email, password, name, surname, phoneNumber);
        this.delivererStatus=delivererStatus;
    }

	public DelivererStatus getDelivererStatus() {
		return delivererStatus;
	}

	public void setDelivererStatus(DelivererStatus delivererStatus) {
		this.delivererStatus = delivererStatus;
	}

    
}
