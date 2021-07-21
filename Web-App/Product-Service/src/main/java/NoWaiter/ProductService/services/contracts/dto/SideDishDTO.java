package NoWaiter.ProductService.services.contracts.dto;

import java.util.UUID;

public class SideDishDTO {
	
	public UUID Id;
	
	public String Name;
	
	public SideDishDTO() {}

	public SideDishDTO(UUID id, String name) {
		super();
		Id = id;
		Name = name;
	}
	
}
