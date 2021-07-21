package no_waiter.order_service.services.contracts.dto;

import java.util.List;
import java.util.UUID;

public class OrderItemDTO {

	public UUID Id;
	
	public int Count;
	
	public String Note;

	public List<UUID> SideDishes;

	public OrderItemDTO() {}
	
	public OrderItemDTO(UUID id, int count, List<UUID> sideDishes, String note) {
		super();
		Id = id;
		Count = count;
		Note = note;
		SideDishes = sideDishes;
	}

}
