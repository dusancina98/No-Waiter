package NoWaiter.ObjectService.entities;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Where;

@Entity
@Where(clause = "deleted=false")
public class ObjectAdmin {
	
	@Id
    private UUID id;
	
	@ManyToOne
	private Object object;
	
	private boolean deleted = Boolean.FALSE;
		
	public ObjectAdmin() { }
	
	public ObjectAdmin(Object object) {
		this(UUID.randomUUID(), object);
	}

	public ObjectAdmin(UUID id, Object object) {
		super();
		this.id = id;
		this.object = object;
		this.deleted=false;
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

	public boolean isDeleted() {
		return deleted;
	}
	
	public void delete() {
		this.deleted=true;
	}

}
