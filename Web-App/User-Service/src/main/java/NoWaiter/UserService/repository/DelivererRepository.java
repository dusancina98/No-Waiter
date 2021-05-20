package NoWaiter.UserService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import NoWaiter.UserService.entities.Deliverer;

public interface DelivererRepository extends JpaRepository<Deliverer, UUID> {

}
