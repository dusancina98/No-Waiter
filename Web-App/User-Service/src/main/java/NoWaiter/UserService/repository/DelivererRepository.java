package NoWaiter.UserService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import NoWaiter.UserService.entities.Deliverer;

public interface DelivererRepository extends JpaRepository<Deliverer, UUID> {
	
	@Query(value = "SELECT d FROM Deliverer d WHERE d.deleted = 'false'")
	List<Deliverer> getAll();
	

}
