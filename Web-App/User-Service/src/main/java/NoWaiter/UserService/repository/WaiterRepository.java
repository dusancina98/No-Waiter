package NoWaiter.UserService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.UserService.entities.Waiter;

public interface WaiterRepository extends PagingAndSortingRepository<Waiter, UUID>{

	@Query(value = "SELECT w FROM Waiter w WHERE w.objectId = ?1")
	List<Waiter> findAllByObjectId(UUID objectId);
}
