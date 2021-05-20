package NoWaiter.UserService.services.contracts;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.UUID;

import NoWaiter.UserService.entities.DelivererRequest;
import NoWaiter.UserService.services.contracts.dto.DelivererRequestDTO;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

public interface DelivererService {

	UUID createDelivererRequest(DelivererRequestDTO delivererRequestDTO) throws ClassFieldValidationException;

	void approveDelivererRequest(UUID requestId) throws ClassFieldValidationException, NoSuchAlgorithmException;

	List<DelivererRequest> getAllPendingRequests();
}
