package NoWaiter.ProductService.entities;

import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Product {

	@Id
	private UUID id;
	
	@ManyToOne
	private ProductCategory productCategory;
	
	private String name;
	
	private String description;
	
	private boolean available;
	
	private String imagePath;
	
	private double price;
	
	@Embedded
	private ProductAmount productAmount;
	
	@ManyToOne
	private ProductType productType;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Ingredient> ingredients;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<SideDish> sideDishes;
	
	public Product() { }

	public Product(UUID id, String name, String description, boolean available, String imagePath, double price, int amount, String amountName, ProductType productType, List<Ingredient> ingredients, List<SideDish> sideDishes) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.available = available;
		this.imagePath = imagePath;
		this.price = price;
		this.productType = productType;
		this.productAmount = new ProductAmount(amount, amountName);
	}
	
	public Product(String name, String description, boolean available, String imagePath, double price, int amount, String amountName, ProductType productType, List<Ingredient> ingredients, List<SideDish> sideDishes) {
		this(UUID.randomUUID(), name, description, available, imagePath, price, amount, amountName, productType, ingredients, sideDishes);
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

	public ProductCategory getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(ProductCategory productCategory) {
		this.productCategory = productCategory;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public ProductType getProductType() {
		return productType;
	}

	public void setProductType(ProductType productType) {
		this.productType = productType;
	}

	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public List<SideDish> getSideDishes() {
		return sideDishes;
	}

	public void setSideDishes(List<SideDish> sideDishes) {
		this.sideDishes = sideDishes;
	}	
}
