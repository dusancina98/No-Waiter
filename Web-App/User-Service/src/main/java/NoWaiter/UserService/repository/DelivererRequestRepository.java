package NoWaiter.UserService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import NoWaiter.UserService.entities.DelivererRequest;

public interface DelivererRequestRepository extends JpaRepository<DelivererRequest, UUID> {
	
	@Query(value = "SELECT dr FROM DelivererRequest dr WHERE dr.requestStatus = 'PENDING'")
	List<DelivererRequest> getAllPendingRequests();

}
