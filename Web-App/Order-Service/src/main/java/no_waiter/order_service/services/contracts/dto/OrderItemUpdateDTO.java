package no_waiter.order_service.services.contracts.dto;

import java.util.List;
import java.util.UUID;

public class OrderItemUpdateDTO {
	public UUID Id;
	public String Name;
	public int Count;
	public UUID ProductId;
	public Double Price;
	public String ImageUrl;
	public List<UUID> SideDishes;
	public String Note; 
	
	public OrderItemUpdateDTO(UUID id, String name, int count, UUID productId, Double price, String imageUrl,
			List<UUID> sideDishes, String note) {
		super();
		Id = id;
		Name = name;
		Count = count;
		ProductId = productId;
		Price = price;
		ImageUrl = imageUrl;
		SideDishes = sideDishes;
		Note = note;
	}
}
