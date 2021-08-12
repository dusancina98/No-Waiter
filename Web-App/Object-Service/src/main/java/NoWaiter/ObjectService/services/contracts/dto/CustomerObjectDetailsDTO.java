package NoWaiter.ObjectService.services.contracts.dto;

public class CustomerObjectDetailsDTO {
	public String Name;
	public String Address;
	public String ImagePath;
	public String Email;
	public String PhoneNumber;
    public IdentifiableDTO<WorkTimeDTO> WorkTime;
    public Double Rating;
	public boolean Favorite;
	public boolean Opened;
	
	public CustomerObjectDetailsDTO(String name, String address, String imagePath, Double rating, boolean favorite, boolean opened, String phoneNumber, String email, IdentifiableDTO<WorkTimeDTO> workTime) {
		super();
		Name = name;
		Address = address;
		ImagePath = imagePath;
		Rating= rating;
		Favorite= favorite;
		Opened= opened;
		Email=email;
		PhoneNumber= phoneNumber;
		WorkTime=workTime;
	}
    
    
}
