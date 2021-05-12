package NoWaiter.UserService.repository;

import NoWaiter.UserService.entities.ObjectAdmin;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface ObjectAdminRepository extends PagingAndSortingRepository<ObjectAdmin, UUID> {
	
	@Query(value = "SELECT o from ObjectAdmin o WHERE o.objectId = ?1")
	List<ObjectAdmin> findByObjectId(UUID objectId);
}
