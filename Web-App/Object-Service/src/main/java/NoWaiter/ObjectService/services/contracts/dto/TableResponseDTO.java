package NoWaiter.ObjectService.services.contracts.dto;

import java.util.UUID;

public class TableResponseDTO {
	public UUID Id;
	public String Name;
	
	public TableResponseDTO(UUID id, int number) {
		super();
		Id = id;
		Name = generateNameFromId(number);
	}

	private String generateNameFromId(int number) {
		// TODO Auto-generated method stub
		return "Table "+ number;
	}
}
