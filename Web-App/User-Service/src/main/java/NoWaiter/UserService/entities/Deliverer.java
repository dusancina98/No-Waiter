package NoWaiter.UserService.entities;

import java.util.UUID;

import javax.persistence.Entity;

import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

@Entity
public class Deliverer extends Worker{

	public Deliverer() {
    }
	
	public Deliverer(UUID id, String email, String password, String name, String surname, UUID objectId, String objectName, String address, String phoneNumber) throws ClassFieldValidationException {
        super(id, email, password, name, surname, phoneNumber);
    }

    public Deliverer(String email, String password, String name, String surname, String phoneNumber) throws ClassFieldValidationException {
        super(email, password, name, surname, phoneNumber);
    }
}
