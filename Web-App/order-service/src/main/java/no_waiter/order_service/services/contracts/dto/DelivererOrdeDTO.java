package no_waiter.order_service.services.contracts.dto;

import java.util.Date;
import java.util.UUID;

public class DelivererOrdeDTO {

	public Double Price;
		
	public Date EstimatedTime;
	
	public UUID OrderId;
	
	public UUID ObjectId;
	
	public String ObjectName;
	
	public String ObjectImage;
	
	public String ObjectAddress;
	
	public DelivererOrdeDTO() {}

	public DelivererOrdeDTO(Double price, Date estimatedTime, UUID orderId, UUID objectId, String objectName,
			String objectImage, String objectAddress) {
		super();
		Price = price;
		EstimatedTime = estimatedTime;
		OrderId = orderId;
		ObjectId = objectId;
		ObjectName = objectName;
		ObjectImage = objectImage;
		ObjectAddress = objectAddress;
	}
	
}
