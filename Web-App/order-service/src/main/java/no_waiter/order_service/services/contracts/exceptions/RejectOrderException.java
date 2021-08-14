package no_waiter.order_service.services.contracts.exceptions;

public class RejectOrderException extends Exception {
	private static final long serialVersionUID = 1L;

	public RejectOrderException(){
		super();
	}
	
	public RejectOrderException(String s){  
		  super(s);  
	}

}
