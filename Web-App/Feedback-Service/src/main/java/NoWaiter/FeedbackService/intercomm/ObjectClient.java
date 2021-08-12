package NoWaiter.FeedbackService.intercomm;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("object-service")
public interface ObjectClient {

    @GetMapping("api/objects/checkObject/{objectId}")
    boolean checkObject(@PathVariable("objectId") UUID objectId);
   
}
