package NoWaiter.UserService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import NoWaiter.UserService.entities.ResetPasswordToken;

public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, UUID> {
	@Query(value = "SELECT t FROM ResetPasswordToken t WHERE t.userId.id = ?1 AND t.used = true")
	List<ResetPasswordToken> getUsedTokensForUser(UUID id);
	
	@Query(value = "SELECT t FROM ResetPasswordToken t WHERE t.token = ?1")
	ResetPasswordToken findToken(String token);

}
