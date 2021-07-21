package NoWaiter.ProductService.services.contracts.exceptions;

public class InvalidOrderItemException extends Exception {
	private static final long serialVersionUID = 1L;

	public InvalidOrderItemException(){
		super();
	}
	
	public InvalidOrderItemException(String s){  
		  super(s);  
	}
}