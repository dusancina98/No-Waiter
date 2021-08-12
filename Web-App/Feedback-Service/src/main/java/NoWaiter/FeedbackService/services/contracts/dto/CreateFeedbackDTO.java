package NoWaiter.FeedbackService.services.contracts.dto;

import java.util.UUID;

import NoWaiter.FeedbackService.entities.FeedbackType;

public class CreateFeedbackDTO {

	public int Grade;

	public UUID EnitityId;
	
	public FeedbackType FeedbackType;
	
	public CreateFeedbackDTO() {}
	  
	public CreateFeedbackDTO(int grade, UUID enitityId, FeedbackType feedbackType) {
		super();
		Grade = grade;
		EnitityId = enitityId;
		FeedbackType = feedbackType;
	}
}
