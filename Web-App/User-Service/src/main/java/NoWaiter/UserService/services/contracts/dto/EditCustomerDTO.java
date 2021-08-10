package NoWaiter.UserService.services.contracts.dto;

public class EditCustomerDTO {

    public String Name;

    public String Surname;
    
    public String PhoneNumber;
    
    public EditCustomerDTO() {}

	public EditCustomerDTO(String name, String surname, String phoneNumber) {
		super();
		Name = name;
		Surname = surname;
		PhoneNumber = phoneNumber;
	}
    
}
