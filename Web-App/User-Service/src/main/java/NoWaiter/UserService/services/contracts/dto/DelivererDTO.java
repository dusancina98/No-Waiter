package NoWaiter.UserService.services.contracts.dto;

public class DelivererDTO {
	public String Email;

    public String Name;

    public String Surname;
    
    public String PhoneNumber;
    
	public DelivererDTO() {
		super();
	}

	public DelivererDTO(String email, String name, String surname, String phoneNumber) {
		super();
		Email = email;
		Name = name;
		Surname = surname;
		PhoneNumber = phoneNumber;
	}
}
