package NoWaiter.UserService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import NoWaiter.UserService.entities.AccountActivation;

public interface AccountActivationRepository extends JpaRepository<AccountActivation, UUID> {

}
