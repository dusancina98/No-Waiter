package NoWaiter.ProductService.entities;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ProductType {

	@Id
	private UUID id;
	
	private String name;
	
	public ProductType() { }

	public ProductType(UUID id, String name) {
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
