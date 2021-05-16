package NoWaiter.UserService.services.contracts.exceptions;

public class NonExistentUserEmailException extends Exception {
	private static final long serialVersionUID = 1L;

	public NonExistentUserEmailException(){
		super();
	}
	
	public NonExistentUserEmailException(String s){  
		  super(s);  
	}
}
