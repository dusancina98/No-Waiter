package NoWaiter.ObjectService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.ObjectService.entities.Object;

public interface ObjectRepository extends PagingAndSortingRepository<Object, UUID> {
	
	@Query(value = "SELECT o FROM Object o WHERE o.id IN ?1")
	List<Object> findAllObjectByIds(List<UUID> ids);
}
