package NoWaiter.UserService.services.implementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NoWaiter.UserService.entities.DelivererRequest;
import NoWaiter.UserService.repository.DelivererRequestRepository;
import NoWaiter.UserService.services.contracts.DelivererService;
import NoWaiter.UserService.services.contracts.dto.DelivererRequestDTO;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;
import NoWaiter.UserService.services.implementation.util.UserMapper;

@Service
public class DelivererServiceImpl implements DelivererService{

	@Autowired
	DelivererRequestRepository delivererRequestRepository;
	
	@Override
	public UUID createDelivererRequest(DelivererRequestDTO delivererRequestDTO) throws ClassFieldValidationException {
		DelivererRequest delivererRequest = UserMapper.MapDelivererRequestDTOToDelivererRequest(delivererRequestDTO);
		delivererRequestRepository.save(delivererRequest);
		return delivererRequest.getId();
	}

}
