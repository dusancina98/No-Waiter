package no_waiter.order_service.services.contracts.dto;

import java.util.Date;
import java.util.UUID;

public class ConfirmedOrderDTO {
	public UUID OrderId;
	
	public String Table;
	
	public String OrderType;
	
	public Double Price;
	
	public Date CreatedTimeStamp;
	
	public Date EstimatedDate;
		
	public ConfirmedOrderDTO(UUID orderId, String table, String orderType, Double price, Date timeStamp,Date estimatedDate) {
		super();
		OrderId = orderId;
		Table = table;
		OrderType = orderType;
		Price = price;
		CreatedTimeStamp = timeStamp;
		EstimatedDate= estimatedDate;
	}
}
