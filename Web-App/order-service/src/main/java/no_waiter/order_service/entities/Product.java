package no_waiter.order_service.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotEmpty;


@Embeddable
public class Product {

	@Column(name = "product_id",nullable = false)
	private UUID id;
	
	@Column(nullable = false)
	private String name;
	
	private String imagePath;

	public Product(UUID id, @NotEmpty(message = "Name is required") String name, String imagePath) {
		super();
		this.id = id;
		this.name = name;
		this.imagePath = imagePath;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public UUID getId() {
		return id;
	}
	
}
