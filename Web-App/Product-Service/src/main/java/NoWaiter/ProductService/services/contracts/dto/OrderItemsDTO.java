package NoWaiter.ProductService.services.contracts.dto;

import java.util.List;

public class OrderItemsDTO {

	public List<OrderItemDTO> Items;
	
	public OrderItemsDTO() {}
	
	public OrderItemsDTO(List<OrderItemDTO> items) {
		super();
		Items = items;
	}

}
