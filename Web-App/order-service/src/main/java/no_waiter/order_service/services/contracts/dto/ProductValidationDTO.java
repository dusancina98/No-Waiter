package no_waiter.order_service.services.contracts.dto;

import java.util.List;
import java.util.UUID;

public class ProductValidationDTO {

	public UUID Id;
	
	public String Name;
	
	public String ImagePath;

	public Double Price;
	
	public List<SideDishDTO> SideDishes;
	
	public ProductValidationDTO() {}

	public ProductValidationDTO(UUID id, String name, String imagePath, Double price, List<SideDishDTO> sideDishes) {
		super();
		Id = id;
		Name = name;
		ImagePath = imagePath;
		Price = price;
		SideDishes = sideDishes;
	}
}
