package no_waiter.order_service.services.contracts.dto;

import java.util.Date;
import java.util.UUID;

public class ReadyOrderDTO {
	public UUID OrderId;
	
	public TableResponseDTO Table;
	
	public String OrderType;
	
	public Double Price;
	
	public Date CreatedTimeStamp;
	
	public Date ExpiredTimeStamp;
	
	public String Deliverer;
	
	public ReadyOrderDTO(UUID orderId, TableResponseDTO table, String orderType, Double price, Date timeStamp, Date expiredTimeStamp, String deliverer) {
		super();
		OrderId = orderId;
		Table = table;
		OrderType = orderType;
		Price = price;
		CreatedTimeStamp = timeStamp;
		ExpiredTimeStamp = expiredTimeStamp;
		Deliverer= deliverer;
	}
}
