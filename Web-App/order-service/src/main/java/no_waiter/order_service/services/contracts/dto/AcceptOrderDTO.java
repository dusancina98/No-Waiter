package no_waiter.order_service.services.contracts.dto;

import java.util.UUID;

public class AcceptOrderDTO {
	public UUID OrderId;
	
	public int EstimatedTime;

	public AcceptOrderDTO() {
		super();
	}

	public AcceptOrderDTO(UUID orderId, int estimatedTime) {
		super();
		OrderId = orderId;
		EstimatedTime = estimatedTime;
	}
}
