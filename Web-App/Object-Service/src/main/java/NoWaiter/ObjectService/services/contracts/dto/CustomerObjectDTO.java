package NoWaiter.ObjectService.services.contracts.dto;

public class CustomerObjectDTO {
	public String Name;
	public String Address;
	public String ImagePath;
	
	public CustomerObjectDTO(String name, String address, String imagePath) {
		super();
		Name = name;
		Address = address;
		ImagePath = imagePath;
	}
}
