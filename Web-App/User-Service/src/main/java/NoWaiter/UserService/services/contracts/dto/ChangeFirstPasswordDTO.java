package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class ChangeFirstPasswordDTO {
	public UUID userId;
	public String password;
	public String repeatedPassword;
	public String token;

	public ChangeFirstPasswordDTO() {
	}

	public ChangeFirstPasswordDTO(UUID userId,String password, String repeatedPassword, String token) {
		super();
		this.userId = userId;
		this.password= password;
		this.repeatedPassword= repeatedPassword;
		this.token=token;
	}
}
