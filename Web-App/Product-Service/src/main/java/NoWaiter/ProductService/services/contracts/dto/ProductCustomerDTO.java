package NoWaiter.ProductService.services.contracts.dto;

import java.util.List;

public class ProductCustomerDTO {
	public IdentifiableDTO<NameDTO> ProductCategory;
	
	public String Name;
	
	public String Description;
	
	public double Price;
	
	public String MeasureUnit;
	
	public int Amount;
	
	
	public List<IdentifiableDTO<NameDTO>> Ingredients;
	
	public List<SideDishCustomerDTO> SideDishes;
	
	public String Image;
	
	public ProductCustomerDTO() { }

	public ProductCustomerDTO(IdentifiableDTO<NameDTO> productCategory, String name, String description, double price, String measureUnit,
			int amount, List<IdentifiableDTO<NameDTO>> ingredients, List<SideDishCustomerDTO> sideDishes, String image) {
		super();
		ProductCategory = productCategory;
		Name = name;
		Description = description;
		Price = price;
		MeasureUnit = measureUnit;
		Amount = amount;
		Ingredients = ingredients;
		SideDishes = sideDishes;
		Image = image;
	}
}
