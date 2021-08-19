package NoWaiter.FeedbackService.services.contracts;

import java.util.List;
import java.util.UUID;

import NoWaiter.FeedbackService.services.contracts.dto.CreateFeedbackDTO;
import NoWaiter.FeedbackService.services.contracts.dto.ObjectFeedbackDTO;
import NoWaiter.FeedbackService.services.contracts.exceptions.ClassFieldValidationException;

public interface FeedbackService {
	
	void createFeedback(UUID userId, CreateFeedbackDTO feedbackDTO) throws ClassFieldValidationException;
	
	ObjectFeedbackDTO findObjectFeedback(UUID objectId);
	
	Iterable<ObjectFeedbackDTO> findObjectFeedbacks(List<UUID> objectIds);

	Double getFeedbackGradeForDeliverer(UUID delivererId);
}
