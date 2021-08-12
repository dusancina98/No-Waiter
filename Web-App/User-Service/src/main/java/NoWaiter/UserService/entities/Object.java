package NoWaiter.UserService.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;

@Embeddable
public class Object {

	@Id
	@Column(nullable = false)
    private UUID id;

	public Object() {}
	
	public Object(UUID id) {
		super();
		this.id = id;
	}

	public UUID getId() {
		return id;
	}
}
