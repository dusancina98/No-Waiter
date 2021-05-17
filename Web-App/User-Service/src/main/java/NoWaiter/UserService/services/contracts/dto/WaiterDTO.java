package NoWaiter.UserService.services.contracts.dto;

public class WaiterDTO extends UserDTO {
	
    public String Address;
    
    public String PhoneNumber;
    
    public WaiterDTO() { }

	public WaiterDTO(String email, String name, String surname, String address, String phoneNumber) {
		super(email, name, surname);
		Address = address;
		PhoneNumber = phoneNumber;
	}
}
