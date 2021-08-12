package NoWaiter.FeedbackService.intercomm;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("user-service")
public interface UserClient {

	@GetMapping("api/users/deliverer/{delivererId}/check")
    @CrossOrigin
    boolean checkDeliverer(@PathVariable UUID delivererId);
}
