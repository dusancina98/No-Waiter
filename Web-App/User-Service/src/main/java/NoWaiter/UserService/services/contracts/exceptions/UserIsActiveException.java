package NoWaiter.UserService.services.contracts.exceptions;

public class UserIsActiveException extends Exception {
	private static final long serialVersionUID = 1L;

	public UserIsActiveException(){
		super();
	}
	
	public UserIsActiveException(String s){  
		  super(s);  
	}

}
