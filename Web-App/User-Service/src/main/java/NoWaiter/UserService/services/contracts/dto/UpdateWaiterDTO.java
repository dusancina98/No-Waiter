package NoWaiter.UserService.services.contracts.dto;

public class UpdateWaiterDTO extends UpdateObjectAdminRequestDTO {

	public UpdateWaiterDTO() {
		super();
	}

	public UpdateWaiterDTO(String name, String surname, String address, String phoneNumber) {
		super(name, surname, address, phoneNumber);
	}

	
}
