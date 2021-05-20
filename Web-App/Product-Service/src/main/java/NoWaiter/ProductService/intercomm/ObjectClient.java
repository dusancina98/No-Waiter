package NoWaiter.ProductService.intercomm;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient("object-service")
public interface ObjectClient {

	
}
