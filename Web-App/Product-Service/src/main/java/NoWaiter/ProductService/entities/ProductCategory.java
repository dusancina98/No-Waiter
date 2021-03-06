package NoWaiter.ProductService.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Where;

@Entity
@Where(clause = "deleted=false")
public class ProductCategory {
	
	@Id
	private UUID id;
	
	private UUID objectId;
	
	private String name;
	
	@OneToMany(mappedBy = "productCategory")
	private List<Product> products;
	
    private boolean deleted = Boolean.FALSE;
	
	public ProductCategory() { }

	public ProductCategory(UUID id, UUID objectId, String name, List<Product> products) {
		super();
		this.id = id;
		this.objectId = objectId;
		this.name = name;
		this.products = products;
	}
	
	public ProductCategory(UUID objectId, String name) {
		this(UUID.randomUUID(), objectId, name, new ArrayList<Product>());
	}

	public UUID getObjectId() {
		return objectId;
	}

	public void setObjectId(UUID objectId) {
		this.objectId = objectId;
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

	public List<Product> getProducts() {
		return products;
	}

	public void addProduct(Product product) {
		if(products == null)
			products = new ArrayList<Product>();
		
		products.add(product);
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public boolean isDeleted() {
		return deleted;
	}
	
	public void delete() {
		this.deleted=true;
		for(Product product : products)
			product.delete();
	}
}
