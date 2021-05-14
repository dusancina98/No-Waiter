package NoWaiter.UserService.services.contracts.exceptions;

public class PasswordIsNotStrongException extends Exception {
	private static final long serialVersionUID = 1L;

	public PasswordIsNotStrongException(){
		super();
	}
	
	public PasswordIsNotStrongException(String s){  
		  super(s);  
	}
}
