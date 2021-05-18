package NoWaiter.ObjectService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.ObjectService.entities.ObjectAdmin;

public interface ObjectAdminRepository extends PagingAndSortingRepository<ObjectAdmin, UUID>{

	@Query(value = "SELECT o.object FROM ObjectAdmin o WHERE o.id = ?1")
	NoWaiter.ObjectService.entities.Object findObjectByAdminId(UUID adminId);
}
