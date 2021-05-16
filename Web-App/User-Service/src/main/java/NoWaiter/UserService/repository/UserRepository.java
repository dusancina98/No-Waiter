package NoWaiter.UserService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import NoWaiter.UserService.entities.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmail ( String email );
}

