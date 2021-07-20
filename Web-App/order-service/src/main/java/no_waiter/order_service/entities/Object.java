package no_waiter.order_service.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Object {

    @Column(name = "object_id")
	private UUID id;

    @Column(name="object_name", unique=true)
    private String name;

	public Object(UUID id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public UUID getId() {
		return id;
	}
  
}
