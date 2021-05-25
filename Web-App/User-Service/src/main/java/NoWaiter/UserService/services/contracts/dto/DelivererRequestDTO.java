package NoWaiter.UserService.services.contracts.dto;

public class DelivererRequestDTO {

    
    public String Email;

    public String Name;

    public String Surname;
    
    public String PhoneNumber;
    
    public String Reference;

	public DelivererRequestDTO() {
		super();
	}

	public DelivererRequestDTO(String email, String name, String surname, String phoneNumber, String reference) {
		super();
		Email = email;
		Name = name;
		Surname = surname;
		PhoneNumber = phoneNumber;
		Reference = reference;
	}
}
