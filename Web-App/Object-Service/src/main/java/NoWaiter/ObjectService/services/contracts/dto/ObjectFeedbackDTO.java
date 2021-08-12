package NoWaiter.ObjectService.services.contracts.dto;

import java.util.UUID;

public class ObjectFeedbackDTO {

	public UUID ObjectId;
	
	public double Grade;
	
	public ObjectFeedbackDTO() {}

	public ObjectFeedbackDTO(UUID objectId, double grade) {
		super();
		ObjectId = objectId;
		Grade = grade;
	}
}
