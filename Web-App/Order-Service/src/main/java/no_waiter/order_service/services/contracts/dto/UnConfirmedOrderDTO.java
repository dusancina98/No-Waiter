package no_waiter.order_service.services.contracts.dto;

import java.util.Date;
import java.util.UUID;

public class UnConfirmedOrderDTO {
	
	public UUID OrderId;
	
	public TableResponseDTO Table;
	
	public String OrderType;
	
	public Double Price;
	
	public Date TimeStamp;
		
	public UnConfirmedOrderDTO(UUID orderId, TableResponseDTO table, String orderType, Double price, Date timeStamp) {
		super();
		OrderId = orderId;
		Table = table;
		OrderType = orderType;
		Price = price;
		TimeStamp = timeStamp;
	}
	
	
}
