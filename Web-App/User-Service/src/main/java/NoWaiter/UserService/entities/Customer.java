package NoWaiter.UserService.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

@Entity
public class Customer extends User {

	private String phoneNumber;

	@OneToMany(cascade={CascadeType.ALL})
	private List<Address> addresses;

	@ElementCollection
	@CollectionTable(name="FavouriteObjects", joinColumns=@JoinColumn(name="user_id"))
	@Column(name="favourite_objects")
	private List<UUID> favouriteObjects;
	
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
		this.favouriteObjects = new ArrayList<UUID>();
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
	
	public void addAddress(Address address) {
		if (this.addresses == null) {
			this.addresses = new ArrayList<Address>();
		}
		
		this.addresses.add(address);
	}
	
	public void removeAddress(UUID addressId) {
		if (this.addresses == null) {
			return;
		}
		
		this.addresses.removeIf(e -> e.getId().equals(addressId));

	}

	public List<UUID> getFavouriteObjects() {
		return favouriteObjects;
	}

	public void setFavouriteObjects(List<UUID> favouriteObjects) {
		this.favouriteObjects = favouriteObjects;
	}
	
	public void addObjectToFavourites(UUID objectId) {
		if (this.favouriteObjects == null) {
			this.favouriteObjects = new ArrayList<UUID>();
		}
		
		if(!this.favouriteObjects.contains(objectId)) {
			this.favouriteObjects.add(objectId);
		}
	}
	
	public void removeObjectFromFavourites(UUID objectId) {
		if (this.favouriteObjects == null) {
			this.favouriteObjects = new ArrayList<UUID>();
		}
		
		this.favouriteObjects.removeIf(e -> e.equals(objectId));
		
	}
}
