package NoWaiter.UserService.services.contracts.exceptions;

public class ActivationLinkExpiredOrUsed extends Exception {
	private static final long serialVersionUID = 1L;

	public ActivationLinkExpiredOrUsed(){
		super();
	}
	
	public ActivationLinkExpiredOrUsed(String s){  
		  super(s);  
	}

}
