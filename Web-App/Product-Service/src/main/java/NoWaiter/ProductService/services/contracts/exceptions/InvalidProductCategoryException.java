package NoWaiter.ProductService.services.contracts.exceptions;

public class InvalidProductCategoryException extends Exception {
	private static final long serialVersionUID = 1L;

	public InvalidProductCategoryException(){
		super();
	}
	
	public InvalidProductCategoryException(String s){  
		  super(s);  
	}
}
