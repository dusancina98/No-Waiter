package NoWaiter.UserService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import NoWaiter.UserService.entities.DelivererRequest;

public interface DelivererRequestRepository extends JpaRepository<DelivererRequest, UUID> {

}
