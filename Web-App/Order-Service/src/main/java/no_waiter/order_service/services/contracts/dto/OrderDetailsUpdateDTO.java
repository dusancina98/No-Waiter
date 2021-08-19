package no_waiter.order_service.services.contracts.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class OrderDetailsUpdateDTO {
	public UUID OrderId;
	
	public Date CreatedTime;
	
	public String Address;
	
	public Date EstimatedTime;
	
	public String OrderType;
	
	public TableResponseDTO Table;
	
	public Double Price;
	
	public List<OrderItemUpdateDTO> OrderItems;
	
	public String OrderStatus;
	
	public OrderDetailsUpdateDTO(UUID orderId, Date createdTime, String address, Date estimatedTime, String orderType,
			TableResponseDTO table, Double price, List<OrderItemUpdateDTO> orderItems, String orderStatus) {
		super();
		OrderId = orderId;
		CreatedTime = createdTime;
		Address = address;
		EstimatedTime = estimatedTime;
		OrderType = orderType;
		Table = table;
		Price = price;
		OrderItems = orderItems;
		OrderStatus = orderStatus;
	}
}
