package NoWaiter.UserService.services.contracts.dto;

public class WaiterDTO extends UserDTO {
	
    public String Address;
    
    public String PhoneNumber;
    
    public WaiterDTO() { }

	public WaiterDTO(String address, String phoneNumber) {
		super();
		Address = address;
		PhoneNumber = phoneNumber;
	}
}
