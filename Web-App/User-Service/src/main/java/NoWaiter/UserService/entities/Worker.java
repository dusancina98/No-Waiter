package NoWaiter.UserService.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;

import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

@Entity
public class Worker extends User{
	@Column(nullable = false)
    private String phoneNumber;
		
	public Worker() {
    }

    public Worker(UUID id, String email, String password, String name, String surname, String phoneNumber) throws ClassFieldValidationException {
        super(id, email, password, name, surname);
        this.phoneNumber = phoneNumber;
    }

    public Worker(String email, String password, String name, String surname, String phoneNumber) throws ClassFieldValidationException {
        super(email, password, name, surname);
        this.phoneNumber = phoneNumber;
    }

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
}
