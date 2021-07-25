package no_waiter.order_service.services.contracts.dto;

import java.util.Date;
import java.util.UUID;

public class CompletedOrderDTO {
	public UUID OrderId;
	
	public String Table;
	
	public String OrderType;
	
	public Double Price;
	
	public Date CreatedTimeStamp;
	
	public String Deliverer;
	
	public CompletedOrderDTO(UUID orderId, String table, String orderType, Double price, Date timeStamp, String deliverer) {
		super();
		OrderId = orderId;
		Table = table;
		OrderType = orderType;
		Price = price;
		CreatedTimeStamp = timeStamp;
		Deliverer= deliverer;
	}
}
