package NoWaiter.ObjectService.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@javax.persistence.Table(name="Tables")
public class Table {
	
	@Id
    private UUID id;

	@Column(nullable = false)
    private int number;
	
	@ManyToOne
	private Object object;
	
	public Table() { }

	public Table(UUID id, int number, Object object) {
		super();
		this.id = id;
		this.number = number;
		this.object = object;
	}
	
	public Table(int number, Object object) {
		this(UUID.randomUUID(), number, object);
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public Object getObject() {
		return object;
	}

	public void setObject(Object object) {
		this.object = object;
	}

	public UUID getId() {
		return id;
	}
		
}
