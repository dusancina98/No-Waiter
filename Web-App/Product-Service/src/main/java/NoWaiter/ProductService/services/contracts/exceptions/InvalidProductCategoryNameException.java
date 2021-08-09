package NoWaiter.ProductService.services.contracts.exceptions;

public class InvalidProductCategoryNameException extends Exception {
	private static final long serialVersionUID = 1L;

	public InvalidProductCategoryNameException(){
		super();
	}
	
	public InvalidProductCategoryNameException(String s){  
		  super(s);  
	}
}

