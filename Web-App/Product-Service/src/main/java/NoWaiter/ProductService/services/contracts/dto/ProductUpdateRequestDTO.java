package NoWaiter.ProductService.services.contracts.dto;

import java.util.List;
import java.util.UUID;

public class ProductUpdateRequestDTO {

	public String Name;
	
	public String Description;
	
	public double Price;
	
	public String MeasureUnit;
	
	public int Amount;
	
	public UUID ProductTypeId;
	
	public List<String> Ingredients;
	
	public List<String> SideDishes;
	
	public ProductUpdateRequestDTO() { }

	public ProductUpdateRequestDTO(String name, String description, double price, String measureUnit, int amount,
			UUID productTypeId, List<String> ingredients, List<String> sideDishes) {
		super();
		Name = name;
		Description = description;
		Price = price;
		MeasureUnit = measureUnit;
		Amount = amount;
		ProductTypeId = productTypeId;
		Ingredients = ingredients;
		SideDishes = sideDishes;
	}	
}
