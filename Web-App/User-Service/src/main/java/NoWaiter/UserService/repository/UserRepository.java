package NoWaiter.UserService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import NoWaiter.UserService.entities.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    @Query(value = "SELECT u FROM User u WHERE u.deleted = 'false' AND u.email = ?1")
	User findByEmail ( String email );
    
    @Query(value = "SELECT u FROM User u WHERE u.deleted = 'false'")
	List<User> findAll();
}

