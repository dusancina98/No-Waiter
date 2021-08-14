package no_waiter.order_service.services.contracts.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import no_waiter.order_service.entities.OrderType;

public class OrderHistoryDTO {
	public UUID Id;
	
	public String ObjectName;
	
	public OrderType OrderType;
	
    public String Address;
    
    public Date CreatedDate;

    public Double Price;
    
    public List<CustomerOrderItemDTO> OrderItems;

	public OrderHistoryDTO(UUID id, String objectName, no_waiter.order_service.entities.OrderType orderType,
			String address, Date createdDate, Double price, List<CustomerOrderItemDTO> orderItems) {
		super();
		Id = id;
		ObjectName = objectName;
		OrderType = orderType;
		Address = address;
		CreatedDate = createdDate;
		Price = price;
		OrderItems = orderItems;
	}
}
