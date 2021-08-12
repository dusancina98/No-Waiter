package NoWaiter.ObjectService.services.contracts.dto;

public class CustomerObjectDTO {
	public String Name;
	public String Address;
	public String ImagePath;
	public Double Rating;
	public boolean Favorite;
	public boolean Opened;
	
	public CustomerObjectDTO(String name, String address, String imagePath) {
		super();
		Name = name;
		Address = address;
		ImagePath = imagePath;
		Rating= 0.0;
		Favorite= false;
		Opened= false;
	}
	
	public CustomerObjectDTO(String name, String address, String imagePath, Double rating, boolean favorite, boolean opened) {
		super();
		Name = name;
		Address = address;
		ImagePath = imagePath;
		Rating= rating;
		Favorite= favorite;
		Opened= opened;
	}	
}
