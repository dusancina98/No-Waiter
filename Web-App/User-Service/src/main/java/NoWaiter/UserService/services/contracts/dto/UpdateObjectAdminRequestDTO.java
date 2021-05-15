package NoWaiter.UserService.services.contracts.dto;

public class UpdateObjectAdminRequestDTO {

	public String Name;

	public String Surname;
	    
	public String Address;
   	    
	public String PhoneNumber;
	 
	public UpdateObjectAdminRequestDTO() { }

	public UpdateObjectAdminRequestDTO(String name, String surname, String address, String phoneNumber) {
		super();
		Name = name;
		Surname = surname;
		Address = address;
		PhoneNumber = phoneNumber;
	}
	 
}
