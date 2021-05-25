package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class RejectDelivererDTO {
	public UUID Id;
	
	public String Reason;
	
	public RejectDelivererDTO() {
		
	}
	
	public RejectDelivererDTO(UUID id, String reason) {
		super();
		this.Id=id;
		this.Reason=reason;
	}
}
