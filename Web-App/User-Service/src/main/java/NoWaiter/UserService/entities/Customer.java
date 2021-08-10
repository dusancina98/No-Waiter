package NoWaiter.UserService.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

@Entity
public class Customer extends User {

	private String phoneNumber;

	@OneToMany(cascade={CascadeType.ALL})
	private List<Address> addresses;

	public Customer() {
		super();
	}

	public Customer(String email, String password, String name, String surname, String phoneNumber, String address) throws ClassFieldValidationException {
		this(UUID.randomUUID(), email, password, name, surname, phoneNumber, new ArrayList<Address>() {
			private static final long serialVersionUID = 1L;{ add(new Address(address));}});
	}

	public Customer(UUID id, String email, String password, String name, String surname, String phoneNumber, List<Address> addresses)
			throws ClassFieldValidationException {
		super(id, email, password, name, surname);
		this.phoneNumber = phoneNumber;
		this.addresses = addresses;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}	
}
