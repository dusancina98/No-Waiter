package no_waiter.order_service.intercomm;

import java.util.List;
import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import no_waiter.order_service.services.contracts.dto.ObjectDetailsDTO;

@FeignClient("object-service")
public interface ObjectClient {
	
	@GetMapping("api/objects/admin/{objectAdminId}")
	UUID getObjectIdByObjectAdminId(@PathVariable UUID objectAdminId);
	
	@GetMapping("api/objects/table/{objectId}/{tableId}")
	int getTableNumberByTableIdForResturant(@PathVariable UUID objectId, @PathVariable UUID tableId);

	@PostMapping("api/objects/details")
	List<ObjectDetailsDTO> getObjectDetailsByObjectIds(@RequestBody List<UUID> objectIds);
}
