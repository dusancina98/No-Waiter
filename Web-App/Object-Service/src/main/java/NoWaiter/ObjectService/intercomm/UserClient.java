package NoWaiter.ObjectService.intercomm;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import NoWaiter.ObjectService.services.contracts.dto.UserClientObjectDTO;


@FeignClient("user-service")
public interface UserClient {
	
	 @PutMapping("api/users/objects")
	 void updateObject(@RequestBody UserClientObjectDTO userClientObjectDTO);
}
