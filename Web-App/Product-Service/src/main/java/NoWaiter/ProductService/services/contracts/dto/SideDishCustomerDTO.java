package NoWaiter.ProductService.services.contracts.dto;

import java.util.UUID;

public class SideDishCustomerDTO {
	public UUID id;
	public String item;
	
	public SideDishCustomerDTO(UUID id, String item) {
		super();
		this.id = id;
		this.item = item;
	}

}
