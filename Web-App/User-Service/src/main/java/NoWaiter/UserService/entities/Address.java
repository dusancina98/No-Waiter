package NoWaiter.UserService.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Address {

	@Id
    @Column(name = "id")
    private UUID id;
	
	@Column(name = "name")
    private String name;

    public Address() { }

    public Address(String name) {
    	this.id = UUID.randomUUID();
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
