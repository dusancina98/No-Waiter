package NoWaiter.ObjectService.intercomm;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import NoWaiter.ObjectService.services.contracts.dto.UserClientObjectDTO;


@FeignClient("user-service")
public interface UserClient {
	
	 @PutMapping("api/users/objects")
	 void updateObject(@RequestBody UserClientObjectDTO userClientObjectDTO);
	 
	 @GetMapping("api/users/employee/waiter/{waiterId}/object-id")
	 UUID findObjectIdByWaiterId(@PathVariable UUID waiterId);
}
