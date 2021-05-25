package NoWaiter.ProductService.services.contracts.dto;

import java.util.List;

public class ProductDTO {

	public IdentifiableDTO<NameDTO> ProductCategory;
	
	public String Name;
	
	public String Description;
	
	public double Price;
	
	public String MeasureUnit;
	
	public int Amount;
	
	public IdentifiableDTO<NameDTO> ProductType;
	
	public List<IdentifiableDTO<NameDTO>> Ingredients;
	
	public List<IdentifiableDTO<NameDTO>> SideDishes;
	
	public String Image;
	
	public ProductDTO() { }

	public ProductDTO(IdentifiableDTO<NameDTO> productCategory, String name, String description, double price, String measureUnit,
			int amount, IdentifiableDTO<NameDTO> productType, List<IdentifiableDTO<NameDTO>> ingredients, List<IdentifiableDTO<NameDTO>> sideDishes, String image) {
		super();
		ProductCategory = productCategory;
		Name = name;
		Description = description;
		Price = price;
		MeasureUnit = measureUnit;
		Amount = amount;
		ProductType = productType;
		Ingredients = ingredients;
		SideDishes = sideDishes;
		Image = image;
	}
	
}
