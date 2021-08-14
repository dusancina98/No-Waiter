package no_waiter.order_service.intercomm;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@FeignClient("user-service")
public interface UserClient {

	 @GetMapping("api/users/employee/waiter/{waiterId}/object-id")
	 UUID findObjectIdByWaiterId(@PathVariable UUID waiterId);
	 
	 @GetMapping("api/users/customers/penalties/{customerId}")
	 int getPenaltiesForCustomer(@PathVariable UUID customerId);
	 
	 @PutMapping("api/users/customers/penalties/{customerId}/increment")
	 void incrementCustomerPenalties(@PathVariable UUID customerId);
}
