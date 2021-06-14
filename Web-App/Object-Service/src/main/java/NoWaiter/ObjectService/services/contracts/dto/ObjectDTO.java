package NoWaiter.ObjectService.services.contracts.dto;

public class ObjectDTO {

    public String Name;

    public String Email;

    public String PhoneNumber;

    public String ImagePath;

    public String Address;
    
    public IdentifiableDTO<WorkTimeDTO> WorkTime;

    public ObjectDTO() { }

    public ObjectDTO(String name, String email, String phoneNumber, String imagePath, String address,
    		IdentifiableDTO<WorkTimeDTO> workTime) {
		super();
		Name = name;
		Email = email;
		PhoneNumber = phoneNumber;
		ImagePath = imagePath;
		Address = address;
		WorkTime = workTime;
	}
}
