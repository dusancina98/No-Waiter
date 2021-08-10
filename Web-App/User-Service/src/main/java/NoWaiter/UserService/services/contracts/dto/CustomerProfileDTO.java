package NoWaiter.UserService.services.contracts.dto;

public class CustomerProfileDTO extends UserDTO{

    public String PhoneNumber;

    public CustomerProfileDTO() { }

	public CustomerProfileDTO(String email, String name, String surname, String phoneNumber) {
		super(email, name, surname);
		PhoneNumber = phoneNumber;
	}
}
