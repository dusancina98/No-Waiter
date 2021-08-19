package NoWaiter.FeedbackService.services.implementation;

import java.util.List;
import java.util.UUID;

import javax.validation.ConstraintDeclarationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NoWaiter.FeedbackService.entities.Feedback;
import NoWaiter.FeedbackService.repository.FeedbackRepository;
import NoWaiter.FeedbackService.services.contracts.FeedbackService;
import NoWaiter.FeedbackService.services.contracts.dto.CreateFeedbackDTO;
import NoWaiter.FeedbackService.services.contracts.dto.ObjectFeedbackDTO;
import NoWaiter.FeedbackService.services.contracts.exceptions.ClassFieldValidationException;

@Service
public class FeedbackServiceImpl implements FeedbackService{

	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Override
	public void createFeedback(UUID userId, CreateFeedbackDTO feedbackDTO) throws ClassFieldValidationException {
		Feedback previous = feedbackRepository.findByInitiatorIdAndEntityId(userId, feedbackDTO.EntityId);
		if (previous != null) {
			throw new ConstraintDeclarationException("Feedback already created");
		}
		Feedback feedback = new Feedback(feedbackDTO.Grade, feedbackDTO.FeedbackType, feedbackDTO.EntityId, userId);
		feedbackRepository.save(feedback);
	}

	@Override
	public ObjectFeedbackDTO findObjectFeedback(UUID objectId) {
		Double grade = feedbackRepository.findEntityAvgGrade(objectId);
		return new ObjectFeedbackDTO(objectId, grade == null ? 0 : grade);
	}

	@Override
	public Iterable<ObjectFeedbackDTO> findObjectFeedbacks(List<UUID> objectIds) {
		return feedbackRepository.findObjectFeedbacks(objectIds);
	}

	@Override
	public Double getFeedbackGradeForDeliverer(UUID delivererId) {
		Double grade = feedbackRepository.findEntityAvgGrade(delivererId);
		
		if(grade== null) {
			return 0.0;
		}else {
			return grade;
		}
	}

}
