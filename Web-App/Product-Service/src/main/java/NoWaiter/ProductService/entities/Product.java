package NoWaiter.ProductService.entities;

import java.util.UUID;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Product {

	@Id
	private UUID id;
	
	@ManyToOne
	private ObjectProductCategory productCategory;
	
	private String name;
	
	private String description;
	
	private boolean available;
	
	private String imagePath;
	
	@Embedded
	private ProductAmount productAmount;
	
	public Product() { }

	public Product(UUID id, String name, String description, boolean available, String imagePath, int amount, String amountName) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.available = available;
		this.imagePath = imagePath;
		this.productAmount = new ProductAmount(amount, amountName);
	}
	
	public Product(String name, String description, boolean available, String imagePath, int amount, String amountName) {
		this(UUID.randomUUID(), name, description, available, imagePath, amount, amountName);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public ProductAmount getProductAmount() {
		return productAmount;
	}

	public void setProductAmount(ProductAmount productAmount) {
		this.productAmount = productAmount;
	}

	public UUID getId() {
		return id;
	}	
}
