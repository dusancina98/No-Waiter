package NoWaiter.UserService.entities;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Employee extends User {
	
	private String address;
	
	private String phoneNumber;
	
	public Employee() { }

	public Employee(String email, String password, String name, String surname, String address, String phoneNumber) {
		super(email, password, name, surname);
		this.address = address;
		this.phoneNumber = phoneNumber;
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
