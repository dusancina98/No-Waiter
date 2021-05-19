package NoWaiter.UserService.services.contracts.exceptions;

public class ClassFieldValidationException extends Exception {
	private static final long serialVersionUID = 1L;

	public ClassFieldValidationException(){
		super();
	}
	
	public ClassFieldValidationException(String s){  
		  super(s);  
	}
}
