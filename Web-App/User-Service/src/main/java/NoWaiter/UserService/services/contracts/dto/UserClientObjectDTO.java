package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class UserClientObjectDTO {
	
	public UUID Id;
	
	public String Name;
	
	public UserClientObjectDTO() { }

	public UserClientObjectDTO(UUID id, String name) {
		super();
		Id = id;
		Name = name;
	}
	
}
