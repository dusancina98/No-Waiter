package NoWaiter.UserService.services.contracts.dto;

import NoWaiter.UserService.entities.DelivererStatus;

public class DelivererDTO {
	public String Email;

    public String Name;

    public String Surname;
    
    public String PhoneNumber;
    
    public DelivererStatus DelivererStatus;
    
    public Double Grade;
    
	public DelivererDTO() {
		super();
	}

	public DelivererDTO(String email, String name, String surname, String phoneNumber, DelivererStatus delivererStatus, double grade) {
		super();
		Email = email;
		Name = name;
		Surname = surname;
		PhoneNumber = phoneNumber;
		DelivererStatus = delivererStatus;
		Grade = grade;
	}
}
