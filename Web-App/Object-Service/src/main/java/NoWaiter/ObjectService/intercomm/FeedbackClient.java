package NoWaiter.ObjectService.intercomm;

import java.util.List;
import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import NoWaiter.ObjectService.services.contracts.dto.ObjectFeedbackDTO;

@FeignClient("feedback-service")
public interface FeedbackClient {

	@PostMapping("api/feedbacks/object/grades")
    List<ObjectFeedbackDTO> getObjectsFeedbacks(@RequestBody List<UUID> objectIds);
}
