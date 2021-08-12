package NoWaiter.FeedbackService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.FeedbackService.entities.Feedback;
import NoWaiter.FeedbackService.services.contracts.dto.ObjectFeedbackDTO;

public interface FeedbackRepository extends PagingAndSortingRepository<Feedback, UUID> {
	
	@Query(value = "SELECT AVG(f.grade) "
				 + "FROM Feedback f "
				 + "WHERE f.feedbackId.entityId = ?1")
	double findEntityAvgGrade(UUID id);

	@Query(value = "SELECT new NoWaiter.FeedbackService.services.contracts.dto.ObjectFeedbackDTO(f.feedbackId.entityId, AVG(f.grade)) "
				 + "FROM Feedback f "
				 + "WHERE f.feedbackId.entityId IN (?1)"
				 + "GROUP BY f.feedbackId.entityId")
	List<ObjectFeedbackDTO> findObjectFeedbacks(List<UUID> ids);
}
