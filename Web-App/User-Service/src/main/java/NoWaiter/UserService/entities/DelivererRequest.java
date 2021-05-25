package NoWaiter.UserService.entities;

import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

@Entity
public class DelivererRequest {
	@Id
    @Column(name = "id")
    private UUID id;
	
	@Column(name = "email", nullable = false, unique = true)
    @Email(message = "Email address is not valid")
    @NotEmpty
    private String email;
	
	@Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;
    
    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;
    
    @Column(name = "reference", nullable = false)
    private String reference;
    
    @Enumerated(EnumType.STRING)
	@Column(name="staffType")
	private RequestStatus requestStatus;
    
    public DelivererRequest() { }

	public DelivererRequest(UUID id, String email, String name,
			String surname, String phoneNumber, String reference, RequestStatus requestStatus) throws ClassFieldValidationException {
		super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.surname = surname;
		this.phoneNumber = phoneNumber;
		this.reference = reference;
		this.requestStatus = requestStatus;
		
		validate();
	}
	
	public DelivererRequest(String email, String name, String surname, String phoneNumber, String reference) throws ClassFieldValidationException {
        this(UUID.randomUUID(), email, name, surname, phoneNumber, reference, RequestStatus.PENDING);
    }
	
	public void validate() throws ClassFieldValidationException {
    	ValidatorFactory vf = Validation.buildDefaultValidatorFactory(); Validator
		validator = vf.getValidator(); 
    	Set<ConstraintViolation<DelivererRequest>> violations =  validator.validate(this);
    	
    	if(!violations.isEmpty())
    		throw new ConstraintViolationException(violations);
    	
    	if(this.name.length() < 2 || this.name.toLowerCase().charAt(0) == this.name.charAt(0))
    		throw new ClassFieldValidationException("Name must be at least 2 characters starting with capital letter");
    	
    	if(this.surname.length() < 2 || this.surname.toLowerCase().charAt(0) == this.surname.charAt(0))
    		throw new ClassFieldValidationException("Surname must be at least 2 characters starting with capital letter");
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public RequestStatus getRequestStatus() {
		return requestStatus;
	}

	public void setRequestStatus(RequestStatus requestStatus) {
		this.requestStatus = requestStatus;
	}

	public UUID getId() {
		return id;
	}
}
