package NoWaiter.UserService.services.contracts;

import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import NoWaiter.UserService.services.contracts.dto.DelivererDTO;
import NoWaiter.UserService.services.contracts.dto.DelivererRequestDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.RejectDelivererDTO;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

public interface DelivererService {

	IdentifiableDTO<DelivererDTO> findById(UUID userId);
	
	UUID createDelivererRequest(DelivererRequestDTO delivererRequestDTO) throws ClassFieldValidationException;

	void approveDelivererRequest(UUID requestId) throws ClassFieldValidationException, NoSuchAlgorithmException;

	Iterable<IdentifiableDTO<DelivererRequestDTO>> getAllPendingRequests();

	void rejectDelivererRequest(RejectDelivererDTO rejectDelivererDTO);

	Iterable<IdentifiableDTO<DelivererDTO>> getAllDeliverer();

	void activateDeliverer(UUID id);

	void deactivateDeliverer(UUID id);

	void deleteDeliverer(UUID delivererId);
}
