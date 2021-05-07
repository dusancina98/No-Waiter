package NoWaiter.ObjectService.entities;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ObjectAdmin {
	
	@Id
    private UUID id;
	
	public ObjectAdmin() {
		this(UUID.randomUUID());
	}

	public ObjectAdmin(UUID id) {
		super();
		this.id = id;
	}

	public UUID getId() {
		return id;
	}
}
