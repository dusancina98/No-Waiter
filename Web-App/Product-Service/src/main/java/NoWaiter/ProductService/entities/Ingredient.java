package NoWaiter.ProductService.entities;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Ingredient {

	@Id
	private UUID id;
	
	private String name;
	
	@ManyToOne
	private Product product;
	
	public Ingredient() { }

	public Ingredient(UUID id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public Ingredient(String name) {
		this(UUID.randomUUID(), name);
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

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
}
