package NoWaiter.ObjectService.services.contracts.exceptions;

public class InvalidTimeRangeException extends Exception {
	private static final long serialVersionUID = 1L;

	public InvalidTimeRangeException(){
		super();
	}
	
	public InvalidTimeRangeException(String s){  
		  super(s);  
	}

}
