package no_waiter.order_service.services.contracts.dto;

import java.util.List;
import java.util.UUID;

public class OrderCustomerRequestDTO extends OrderRequestDTO{

	public UUID ObjectId;

	public OrderCustomerRequestDTO() {
		super();
	}

	public OrderCustomerRequestDTO(List<OrderItemDTO> items, no_waiter.order_service.entities.OrderType orderType,
			String address, int estimatedTime, UUID tableId, UUID objectId) {
		super(items, orderType, address, estimatedTime, tableId);
		// TODO Auto-generated constructor stub
		ObjectId = objectId;
	}

}
