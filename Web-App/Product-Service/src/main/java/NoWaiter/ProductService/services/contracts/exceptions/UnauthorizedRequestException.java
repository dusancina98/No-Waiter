package NoWaiter.ProductService.services.contracts.exceptions;

public class UnauthorizedRequestException extends Exception {
	private static final long serialVersionUID = 1L;

	public UnauthorizedRequestException(){
		super();
	}
	
	public UnauthorizedRequestException(String s){  
		  super(s);  
	}
}
