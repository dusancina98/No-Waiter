package no_waiter.order_service.services.contracts.dto;

import java.util.UUID;

public class ObjectDetailsDTO {
 
	public UUID ObjectId;
	
	public String ObjectName;
	
	public String ObjectImage;
	
	public String ObjectAddress;

	public ObjectDetailsDTO() {}
	
	public ObjectDetailsDTO(UUID objectId, String objectName, String objectImage, String objectAddress) {
		super();
		ObjectId = objectId;
		ObjectName = objectName;
		ObjectImage = objectImage;
		ObjectAddress = objectAddress;
	}
	
}
