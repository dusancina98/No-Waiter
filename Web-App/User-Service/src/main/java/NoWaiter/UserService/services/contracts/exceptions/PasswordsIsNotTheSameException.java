package NoWaiter.UserService.services.contracts.exceptions;

public class PasswordsIsNotTheSameException extends Exception {
	private static final long serialVersionUID = 1L;

	public PasswordsIsNotTheSameException(){
		super();
	}
	
	public PasswordsIsNotTheSameException(String s){  
		  super(s);  
	}

}
