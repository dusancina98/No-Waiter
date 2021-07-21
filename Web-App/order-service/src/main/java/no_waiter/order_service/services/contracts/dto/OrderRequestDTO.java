package no_waiter.order_service.services.contracts.dto;

import java.util.List;
import java.util.UUID;

import no_waiter.order_service.entities.OrderType;

public class OrderRequestDTO {

	public List<OrderItemDTO> Items;
	
	public OrderType OrderType;
	
	public String Address;
	
	public int EstimatedTime;
	
	public UUID TableId;

	public OrderRequestDTO() {}
	
	public OrderRequestDTO(List<OrderItemDTO> items, no_waiter.order_service.entities.OrderType orderType,
			String address, int estimatedTime, UUID tableId) {
		super();
		Items = items;
		OrderType = orderType;
		Address = address;
		EstimatedTime = estimatedTime;
		TableId = tableId;
	}
	
}
