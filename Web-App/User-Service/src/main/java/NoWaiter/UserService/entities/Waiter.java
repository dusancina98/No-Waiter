package NoWaiter.UserService.entities;

import javax.persistence.Entity;

@Entity
public class Waiter extends Employee {

	public Waiter() {
		super();
	}

	public Waiter(String email, String password, String name, String surname, String address, String phoneNumber) {
		super(email, password, name, surname, address, phoneNumber);
	}
}
