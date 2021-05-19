package NoWaiter.UserService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import NoWaiter.UserService.entities.AccountActivationToken;

public interface AccountActivationTokenRepository extends JpaRepository<AccountActivationToken, UUID> {

	@Query(value = "SELECT a FROM AccountActivationToken a WHERE a.userId.id = ?1 AND a.used = true")
	List<AccountActivationToken> getUsedActivationsForUser(UUID id);

	@Query(value = "SELECT a FROM AccountActivationToken a WHERE a.token = ?1")
	AccountActivationToken findToken(String token);

}
