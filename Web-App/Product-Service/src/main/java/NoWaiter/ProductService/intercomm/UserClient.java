package NoWaiter.ProductService.intercomm;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient("user-service")
public interface UserClient {

	 @GetMapping("api/users/employee/waiter/{waiterId}/object-id")
	 UUID findObjectIdByWaiterId(@PathVariable UUID waiterId);
}
