package NoWaiter.UserService.services.contracts.exceptions;

public class ActivationLinkExpiredOrUsedException extends Exception {
	private static final long serialVersionUID = 1L;

	public ActivationLinkExpiredOrUsedException(){
		super();
	}
	
	public ActivationLinkExpiredOrUsedException(String s){  
		  super(s);  
	}
}
