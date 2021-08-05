package no_waiter.order_service.services.contracts.dto;

import java.util.Date;
import java.util.UUID;

public class OnRouteOrderDTO {
	public UUID OrderId;
	
	public String OrderType;
	
	public Double Price;
	
	public Date CreatedTimeStamp;
	
	public Date ExpiredTimeStamp;
	
	public String Deliverer;

	public OnRouteOrderDTO(UUID orderId, String orderType, Double price, Date timeStamp, Date expiredTimeStamp, String deliverer) {
		super();
		OrderId = orderId;
		OrderType = orderType;
		Price = price;
		CreatedTimeStamp = timeStamp;
		ExpiredTimeStamp = expiredTimeStamp;
		Deliverer= deliverer;
	}
}
