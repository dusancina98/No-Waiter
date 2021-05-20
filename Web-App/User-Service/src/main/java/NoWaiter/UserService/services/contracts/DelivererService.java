package NoWaiter.UserService.services.contracts;

import java.util.UUID;

import NoWaiter.UserService.services.contracts.dto.DelivererRequestDTO;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

public interface DelivererService {

	UUID createDelivererRequest(DelivererRequestDTO delivererRequestDTO) throws ClassFieldValidationException;

}
