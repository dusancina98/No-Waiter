package NoWaiter.ObjectService.services.contracts.dto;

public class UpdateWorkTimeDTO {
	public String Id;
	
	public IdentifiableDTO<WorkTimeDTO> WorkTime;

	public UpdateWorkTimeDTO(String id, IdentifiableDTO<WorkTimeDTO> workTime) {
		super();
		Id = id;
		WorkTime = workTime;
	}
}
