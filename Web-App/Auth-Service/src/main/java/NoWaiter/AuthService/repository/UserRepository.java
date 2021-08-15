package NoWaiter.AuthService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import NoWaiter.AuthService.entities.User;

public interface UserRepository extends JpaRepository<User, UUID> {
	@Query(value = "SELECT u FROM User u WHERE LOWER(u.email) = LOWER(?1)")
    User findByEmail ( String email );
}
