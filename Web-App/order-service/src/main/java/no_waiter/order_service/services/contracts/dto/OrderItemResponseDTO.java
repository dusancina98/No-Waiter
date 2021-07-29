package no_waiter.order_service.services.contracts.dto;

import java.util.List;
import java.util.UUID;

public class OrderItemResponseDTO {
	public UUID Id;
	public String Name;
	public String Count;
	public UUID ProductId;
	public Double Price;
	public String ImageUrl;
	public List<SideDishDTO> SideDishes;
	
	public OrderItemResponseDTO(UUID id, String name, String count, UUID productId, Double price, String imageUrl,
			List<SideDishDTO> sideDishes) {
		super();
		Id = id;
		Name = name;
		Count = count;
		ProductId = productId;
		Price = price;
		ImageUrl = imageUrl;
		SideDishes = sideDishes;
	}
	
	
}
