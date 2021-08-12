package NoWaiter.FeedbackService.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.FeedbackService.entities.Feedback;

public interface FeedbackRepository extends PagingAndSortingRepository<Feedback, UUID> {

}
