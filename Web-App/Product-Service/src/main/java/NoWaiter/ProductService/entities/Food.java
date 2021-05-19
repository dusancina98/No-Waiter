package NoWaiter.ProductService.entities;

import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Food extends Product{

	@OneToMany
	private List<Ingredient> ingredients;
	
	@OneToMany
	private List<SideDish> sideDishes;
	
	@ManyToOne
	private FoodType foodType;

	public Food() {
		super();
	}

	public Food(String name, String description, boolean available, String imagePath, int amount, String amountName, FoodType foodType, List<Ingredient> ingredients, List<SideDish> sideDishes) {
		this(UUID.randomUUID(), name, description, available, imagePath, amount, amountName, foodType, ingredients, sideDishes);
	}

	public Food(UUID id, String name, String description, boolean available, String imagePath, int amount, String amountName, FoodType foodType, List<Ingredient> ingredients, List<SideDish> sideDishes) {
		super(id, name, description, available, imagePath, amount, amountName);
		this.ingredients = ingredients;
		this.sideDishes = sideDishes;
		this.foodType = foodType;
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

	public FoodType getFoodType() {
		return foodType;
	}

	public void setFoodType(FoodType foodType) {
		this.foodType = foodType;
	}
	
	
}
