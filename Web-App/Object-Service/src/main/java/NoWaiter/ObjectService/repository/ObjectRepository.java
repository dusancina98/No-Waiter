package NoWaiter.ObjectService.repository;

import NoWaiter.ObjectService.entities.Object;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface ObjectRepository extends PagingAndSortingRepository<Object, UUID> {
	@Query(value = "SELECT o FROM Object o WHERE o.deleted = 'false'")
	List<Object> findAll();
}
