package NoWaiter.AuthService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import NoWaiter.AuthService.entities.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmail ( String email );
}
