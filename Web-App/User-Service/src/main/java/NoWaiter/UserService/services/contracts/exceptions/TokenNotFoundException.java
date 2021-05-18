package NoWaiter.UserService.services.contracts.exceptions;

public class TokenNotFoundException extends Exception {
	private static final long serialVersionUID = 1L;

	public TokenNotFoundException(){
		super();
	}
	
	public TokenNotFoundException(String s){  
		  super(s);  
	}

}
