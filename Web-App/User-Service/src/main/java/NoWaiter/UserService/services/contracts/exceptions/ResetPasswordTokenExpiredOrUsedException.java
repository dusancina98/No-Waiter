package NoWaiter.UserService.services.contracts.exceptions;

public class ResetPasswordTokenExpiredOrUsedException  extends Exception {
	private static final long serialVersionUID = 1L;

	public ResetPasswordTokenExpiredOrUsedException(){
		super();
	}
	
	public ResetPasswordTokenExpiredOrUsedException(String s){  
		  super(s);  
	}

}
