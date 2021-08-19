package NoWaiter.UserService.intercomm;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("feedback-service")
public interface FeedbackClient {
	
	@GetMapping("api/feedbacks/deliverer/{delivererId}/grades")
	Double getFeedbackGradeForDeliverer(@PathVariable("delivererId") UUID delivererId);
}
