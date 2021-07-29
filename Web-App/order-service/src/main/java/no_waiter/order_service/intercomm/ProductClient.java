package no_waiter.order_service.intercomm;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import no_waiter.order_service.services.contracts.dto.OrderItemsDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;

@FeignClient("product-service")
public interface ProductClient {

	@PostMapping("api/products/order-items/validate")
	ProductValidationResponseDTO validateOrderItems(@RequestBody OrderItemsDTO items);
}
