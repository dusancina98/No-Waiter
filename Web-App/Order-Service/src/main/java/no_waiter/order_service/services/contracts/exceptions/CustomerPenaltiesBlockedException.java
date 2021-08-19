package no_waiter.order_service.services.contracts.exceptions;

public class CustomerPenaltiesBlockedException extends Exception {
	private static final long serialVersionUID = 1L;

	public CustomerPenaltiesBlockedException(){
		super();
	}
	
	public CustomerPenaltiesBlockedException(String s){  
		  super(s);  
	}
}
