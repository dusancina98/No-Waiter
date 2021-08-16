package NoWaiter.UserService.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;

import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

@Entity
@Table(name="USERS")
@Inheritance(strategy = InheritanceType.JOINED)
@Where(clause = "deleted=false")
public class User{

	@Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "email", nullable = false, unique = true)
    @Email(message = "Email address is not valid")
    @NotEmpty
    private String email;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;
    
    @Column(name = "active", nullable = false)
    private boolean active;
    
    @Column(name="deleted", nullable = false)
	private boolean deleted = Boolean.FALSE;
   

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_authority",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
    private List<Authority> authorities;

    public User() { }

    public User(UUID id, String email, String password, String name, String surname) throws ClassFieldValidationException {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.active=false; 
        this.deleted=false;
		validate();
    }
    
    public User(String email, String password, String name, String surname) throws ClassFieldValidationException {
        this(UUID.randomUUID(), email, password, name, surname);
    }
    
    public void validate() throws ClassFieldValidationException {
    	ValidatorFactory vf = Validation.buildDefaultValidatorFactory(); Validator
		validator = vf.getValidator(); 
    	Set<ConstraintViolation<User>> violations =  validator.validate(this);
    	
    	if(!violations.isEmpty())
    		throw new ConstraintViolationException(violations);
    	
    	if(this.name.length() < 2 || this.name.toLowerCase().charAt(0) == this.name.charAt(0))
    		throw new ClassFieldValidationException("Name must be at least 2 characters starting with capital letter");
    	
    	if(this.surname.length() < 2 || this.surname.toLowerCase().charAt(0) == this.surname.charAt(0))
    		throw new ClassFieldValidationException("Surname must be at least 2 characters starting with capital letter");
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

	public List<Authority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}

	public void addAuthority(Authority authority) {
		if(this.authorities == null)
			this.authorities = new ArrayList<Authority>();
		
		this.authorities.add(authority);
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isDeleted() {
		return deleted;
	}
	
	public void delete() {
		this.deleted = true;
	}
}