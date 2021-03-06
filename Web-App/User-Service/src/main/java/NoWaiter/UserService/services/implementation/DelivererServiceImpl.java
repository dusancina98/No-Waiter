package NoWaiter.UserService.services.implementation;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import NoWaiter.UserService.entities.AccountActivationToken;
import NoWaiter.UserService.entities.Authority;
import NoWaiter.UserService.entities.Deliverer;
import NoWaiter.UserService.entities.DelivererRequest;
import NoWaiter.UserService.entities.RequestStatus;
import NoWaiter.UserService.intercomm.FeedbackClient;
import NoWaiter.UserService.repository.AccountActivationTokenRepository;
import NoWaiter.UserService.repository.DelivererRepository;
import NoWaiter.UserService.repository.DelivererRequestRepository;
import NoWaiter.UserService.services.contracts.DelivererService;
import NoWaiter.UserService.services.contracts.dto.DelivererDTO;
import NoWaiter.UserService.services.contracts.dto.DelivererRequestDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.RejectDelivererDTO;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;
import NoWaiter.UserService.services.implementation.util.UserMapper;

@Service
public class DelivererServiceImpl implements DelivererService{

	@Autowired
	DelivererRequestRepository delivererRequestRepository;
	
	@Autowired
	DelivererRepository delivererRepository;
	
	@Autowired
    private AccountActivationTokenRepository accountActivationTokenRepository;
	
	@Autowired
    private EmailServiceImpl emailService;
	
	@Autowired
	private FeedbackClient feedbackClient;
	
	@Override
	public UUID createDelivererRequest(DelivererRequestDTO delivererRequestDTO) throws ClassFieldValidationException {
		DelivererRequest delivererRequest = UserMapper.MapDelivererRequestDTOToDelivererRequest(delivererRequestDTO);
		delivererRequestRepository.save(delivererRequest);
		return delivererRequest.getId();
	}
	
	@Override
	public void approveDelivererRequest(UUID requestId) throws ClassFieldValidationException, NoSuchAlgorithmException {
		DelivererRequest delivererRequest = delivererRequestRepository.getOne(requestId);
		delivererRequest.setRequestStatus(RequestStatus.APPROVED);
		
		try {
			emailService.sendDelivererAcceptedRequestEmailAsync(delivererRequest);
		} catch (MailException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
		createNewDeliverer(delivererRequest);
		
		delivererRequestRepository.save(delivererRequest);
	}

	private void createNewDeliverer(DelivererRequest delivererRequest) throws ClassFieldValidationException, NoSuchAlgorithmException {
		Deliverer deliverer = UserMapper.MapDelivererRequestToDeliverer(delivererRequest);
		deliverer.addAuthority(new Authority(UUID.fromString("f98f5538-4d52-4e3e-bae3-598e523a6200"), "ROLE_DELIVERER"));

		AccountActivationToken accountActivation = new AccountActivationToken(deliverer.getId(), new Date(System.currentTimeMillis()));
		accountActivationTokenRepository.save(accountActivation);
		
		delivererRepository.save(deliverer);
		
		try {
			emailService.sendDelivererActivationLinkAsync(deliverer, accountActivation.getToken());
		} catch (MailException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	@Override
	public Iterable<IdentifiableDTO<DelivererRequestDTO>> getAllPendingRequests() {
		return UserMapper.MapDelivererRequestCollectionToIdentifiableODelivererRequestDTOCollection(delivererRequestRepository.getAllPendingRequests());
	}

	@Override
	public void rejectDelivererRequest(RejectDelivererDTO rejectDelivererDTO) {
		DelivererRequest delivererRequest = delivererRequestRepository.getOne(rejectDelivererDTO.Id);
		delivererRequest.setRequestStatus(RequestStatus.REJECTED);
		
		try {
			emailService.sendDelivererRejectReasonEmailAsync(delivererRequest, rejectDelivererDTO.Reason);
		} catch (MailException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
		delivererRequestRepository.save(delivererRequest);
	}

	@Override
	public Iterable<IdentifiableDTO<DelivererDTO>> getAllDeliverer() {
		List<IdentifiableDTO<DelivererDTO>> retVal = new ArrayList<IdentifiableDTO<DelivererDTO>>();
		
		for(Deliverer deliverer : delivererRepository.getAll()) {
			retVal.add(UserMapper.MapDelivererToIdentifiableDelivererDto(deliverer,feedbackClient.getFeedbackGradeForDeliverer(deliverer.getId())));
		}
		
		return retVal;
	}

	@Override
	public void activateDeliverer(UUID id) {
		Deliverer deliverer = delivererRepository.getOne(id);
		deliverer.activateDeliverer();
		delivererRepository.save(deliverer);
	}
	
	@Override
	public void deactivateDeliverer(UUID id) {
		Deliverer deliverer = delivererRepository.getOne(id);
		deliverer.deactivateDeliverer();
		delivererRepository.save(deliverer);
	}

	@Override
	public void deleteDeliverer(UUID delivererId) {
		Deliverer deliverer = delivererRepository.getOne(delivererId);
		deliverer.delete();
		delivererRepository.save(deliverer);
	}

	@Override
	public IdentifiableDTO<DelivererDTO> findById(UUID userId) {
		Deliverer deliverer = delivererRepository.findById(userId).get();
		return UserMapper.MapDelivererToIdentifiableDelivererDto(deliverer, feedbackClient.getFeedbackGradeForDeliverer(deliverer.getId()));
	}

	@Override
	public String getDelivererNameAndSurname(UUID delivererId) {
		Deliverer deliverer = delivererRepository.findById(delivererId).get();
		return deliverer.getName() + " " + deliverer.getSurname();
	}

}
