package NoWaiter.ProductService.services.contracts.dto;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class ProductRequestDTO  implements Serializable{
	
	private static final long serialVersionUID = 1L;

	public UUID CategoryId;
	
	public String Name;
	
	public String Description;
	
	public double Price;
	
	public String MeasureUnit;
	
	public int Amount;
	
	public UUID ProductTypeId;
	
	public List<String> Ingredients;
	
	public List<String> SideDishes;
	
	public MultipartFile Image;
	
	public ProductRequestDTO() { }

	public ProductRequestDTO(UUID categoryId, String name, String description, double price, String measureUnit,
			int amount, UUID productTypeId, List<String> ingredients, List<String> sideDishes, MultipartFile image) {
		super();
		CategoryId = categoryId;
		Name = name;
		Description = description;
		Price = price;
		MeasureUnit = measureUnit;
		Amount = amount;
		ProductTypeId = productTypeId;
		Ingredients = ingredients;
		SideDishes = sideDishes;
		Image = image;
	}

}
