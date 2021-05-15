package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class ChangeFirstPasswordDTO {
	public UUID userId;
	public String password;
	public String repeatedPassword;

	public ChangeFirstPasswordDTO() {
	}

	public ChangeFirstPasswordDTO(UUID userId,String password, String repeatedPassword) {
		super();
		this.userId = userId;
		this.password= password;
		this.repeatedPassword= repeatedPassword;
	}
}
