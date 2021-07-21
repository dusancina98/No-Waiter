package no_waiter.order_service.api;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import feign.FeignException;
import no_waiter.order_service.intercomm.AuthClient;
import no_waiter.order_service.intercomm.UserClient;
import no_waiter.order_service.services.contracts.dto.JwtParseResponseDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;

@RestController
@RequestMapping(value = "api/orders")
public class Api {

	@Autowired
	private AuthClient authClient;
	
	@Autowired
	private UserClient userClient;
	
	@PostMapping
	@CrossOrigin
	public ResponseEntity<?> createProductCategory(@RequestHeader("Authorization") String token, @RequestBody OrderRequestDTO requestDTO) {
		try {
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}  
}
