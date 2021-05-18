package NoWaiter.ObjectService.entities;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class ObjectAdmin {
	
	@Id
    private UUID id;
	
	@ManyToOne
	private Object object;
	
	public ObjectAdmin(Object object) {
		this(UUID.randomUUID(), object);
	}

	public ObjectAdmin(UUID id, Object object) {
		super();
		this.id = id;
		this.object = object;
	}

	public UUID getId() {
		return id;
	}

	public Object getObject() {
		return object;
	}

	public void setObject(Object object) {
		this.object = object;
	}
}
