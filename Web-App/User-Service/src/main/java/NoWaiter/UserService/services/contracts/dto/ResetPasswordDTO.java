package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class ResetPasswordDTO {
    public UUID resetPasswordId;
    public String password;
    public String passwordRepeat;
    public String token;
    
	public ResetPasswordDTO() {
		super();
	}
	
	public ResetPasswordDTO(UUID resetPasswordId, String password, String passwordRepeat,String token) {
		super();
		this.resetPasswordId = resetPasswordId;
		this.password = password;
		this.passwordRepeat = passwordRepeat;
		this.token=token;
	}
    
    
}
