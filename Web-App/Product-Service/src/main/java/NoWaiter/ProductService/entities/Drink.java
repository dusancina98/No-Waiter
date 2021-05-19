package NoWaiter.ProductService.entities;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Drink extends Product {

	@ManyToOne
	private DrinkType drinkType;
	
	public Drink() {
		super();
	}

	public Drink(String name, String description, boolean available, String imagePath, int amount, String amountName, DrinkType drinkType) {
		this(UUID.randomUUID(), name, description, available, imagePath, amount, amountName, drinkType);
	}

	public Drink(UUID id, String name, String description, boolean available, String imagePath, int amount, String amountName, DrinkType drinkType) {
		super(id, name, description, available, imagePath, amount, amountName);
		this.drinkType = drinkType;
	}

	public DrinkType getDrinkType() {
		return drinkType;
	}

	public void setDrinkType(DrinkType drinkType) {
		this.drinkType = drinkType;
	}
	
}
