package no_waiter.order_service.services.contracts.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class CustomerObjectIdOrderDTO extends CustomerOrderDTO{

	public UUID ObjectId;

	public CustomerObjectIdOrderDTO(UUID id, String objectName, no_waiter.order_service.entities.OrderType orderType,
			String address, Date createdDate, Double price, List<CustomerOrderItemDTO> orderItems,
			no_waiter.order_service.entities.OrderStatus orderStatus, UUID objectId) {
		super(id, objectName, orderType, address, createdDate, price, orderItems, orderStatus);
		ObjectId = objectId;
	}
	
	
}
