package NoWaiter.ObjectService.services.contracts.dto;

import java.util.UUID;

public class AddAdminDTO {

	public UUID ObjectId;
	
	public UUID AdminId;
	
	public AddAdminDTO() { }

	public AddAdminDTO(UUID objectId, UUID adminId) {
		super();
		ObjectId = objectId;
		AdminId = adminId;
	}
}
