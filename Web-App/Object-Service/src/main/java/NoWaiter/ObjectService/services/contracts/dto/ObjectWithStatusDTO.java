package NoWaiter.ObjectService.services.contracts.dto;

public class ObjectWithStatusDTO extends ObjectDTO {
	
	public boolean Active;
	
	public boolean Blocked;
	
	public ObjectWithStatusDTO() { }

	public ObjectWithStatusDTO(String name, String email, String phoneNumber, String imagePath, String address, IdentifiableDTO<WorkTimeDTO> workTime, boolean active, boolean blocked) {
		super(name, email, phoneNumber, imagePath, address, workTime);
		Active = active;
		Blocked = blocked;
	}
	
}
