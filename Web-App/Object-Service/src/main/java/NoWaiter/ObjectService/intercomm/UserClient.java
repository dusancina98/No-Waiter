package NoWaiter.ObjectService.intercomm;

import java.util.List;
import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import NoWaiter.ObjectService.services.contracts.dto.UserClientObjectDTO;


@FeignClient("user-service")
public interface UserClient {
	
	 @PutMapping("api/users/objects")
	 void updateObject(@RequestBody UserClientObjectDTO userClientObjectDTO);
	 
	 @GetMapping("api/users/employee/waiter/{waiterId}/object-id")
	 UUID findObjectIdByWaiterId(@PathVariable UUID waiterId);
	 
	 @DeleteMapping("api/users/object-workers/{objectId}")
	 UUID deleteObjectWorkers(@PathVariable UUID objectId);
	 
	 @GetMapping("api/users/customer/objects/favourite")
	 List<UUID> findAllCustomerFavouriteObjectIds(@RequestHeader("Authorization") String token);
}
