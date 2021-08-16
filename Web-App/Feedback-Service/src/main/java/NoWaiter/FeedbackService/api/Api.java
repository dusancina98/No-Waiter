package NoWaiter.FeedbackService.api;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.FeedbackService.entities.FeedbackType;
import NoWaiter.FeedbackService.intercomm.AuthClient;
import NoWaiter.FeedbackService.intercomm.ObjectClient;
import NoWaiter.FeedbackService.intercomm.UserClient;
import NoWaiter.FeedbackService.services.contracts.FeedbackService;
import NoWaiter.FeedbackService.services.contracts.dto.CreateFeedbackDTO;
import NoWaiter.FeedbackService.services.contracts.dto.JwtParseResponseDTO;
import feign.FeignException;

@RestController
@RequestMapping(value = "api/feedbacks")
public class Api {

	@Autowired
	private FeedbackService feedbackService;
	
	@Autowired
	private ObjectClient objectClient;
	    
	@Autowired
	private AuthClient authClient;
	
	@Autowired
	private UserClient userClient;
	
	@PostMapping("/object")
    @CrossOrigin
    public ResponseEntity<?> createObjectFeedback(@RequestHeader("Authorization") String token, @RequestBody CreateFeedbackDTO feedbackDTO) {
        try {
        	objectClient.checkObject(feedbackDTO.EntityId);
        	feedbackDTO.FeedbackType = FeedbackType.OBJECT;
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
        	feedbackService.createFeedback(jwtResponse.getId(), feedbackDTO);
        	
            return new ResponseEntity<>( HttpStatus.CREATED);
        } catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
        		return new ResponseEntity<>("Invalid object id: " + feedbackDTO.EntityId, HttpStatus.NOT_FOUND);
    	
        	return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PostMapping("/object/grades")
    @CrossOrigin
    public ResponseEntity<?> getObjectsFeedbacks(@RequestBody List<UUID> objectIds) {
        try {
        	return new ResponseEntity<>(feedbackService.findObjectFeedbacks(objectIds), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@GetMapping("/object/{objectId}/grades")
    @CrossOrigin
    public ResponseEntity<?> getObjectFeedback(@PathVariable UUID objectId) {
        try {
        	return new ResponseEntity<>(feedbackService.findObjectFeedback(objectId), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PostMapping("/deliverer")
    @CrossOrigin
    public ResponseEntity<?> createDelivererFeedback(@RequestHeader("Authorization") String token, @RequestBody CreateFeedbackDTO feedbackDTO) {
        try {
        	userClient.checkDeliverer(feedbackDTO.EntityId);
        	feedbackDTO.FeedbackType = FeedbackType.DELIVERER;
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
        	feedbackService.createFeedback(jwtResponse.getId(), feedbackDTO);
        	
            return new ResponseEntity<>( HttpStatus.CREATED);
        } catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
        		return new ResponseEntity<>("Invalid deliverer id: " + feedbackDTO.EntityId, HttpStatus.NOT_FOUND);
    	
        	return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
