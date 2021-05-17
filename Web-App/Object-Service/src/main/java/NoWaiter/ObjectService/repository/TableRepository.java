package NoWaiter.ObjectService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.ObjectService.entities.Table;

public interface TableRepository extends PagingAndSortingRepository<Table, UUID>{

	@Query(value = "SELECT MAX(t.number) FROM Table t WHERE t.object.id = ?1")
	int findMaxTableNumberByObjectId(UUID objectId);
	
	@Query(value = "SELECT t FROM Table t WHERE t.object.id = ?1")
	Iterable<Table> findAllByObjectId(UUID objectId);
}
