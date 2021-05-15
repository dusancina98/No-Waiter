package NoWaiter.UserService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import NoWaiter.UserService.entities.AccountActivation;

public interface AccountActivationRepository extends JpaRepository<AccountActivation, UUID> {

	@Query(value = "SELECT a FROM AccountActivation a WHERE a.userId.id = ?1 AND a.used = true")
	List<AccountActivation> getUsedActivationsForUser(UUID id);

}
