package no_waiter.order_service.api;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import feign.FeignException;
import no_waiter.order_service.intercomm.AuthClient;
import no_waiter.order_service.intercomm.ProductClient;
import no_waiter.order_service.intercomm.UserClient;
import no_waiter.order_service.services.contracts.OrderService;
import no_waiter.order_service.services.contracts.dto.AcceptOrderDTO;
import no_waiter.order_service.services.contracts.dto.JwtParseResponseDTO;
import no_waiter.order_service.services.contracts.dto.OrderItemsDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;

@RestController
@RequestMapping(value = "api/orders")
public class Api {

	@Autowired
	private AuthClient authClient;
	
	@Autowired
	private UserClient userClient;
	
	@Autowired
	private ProductClient productClient;
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping
	@CrossOrigin
	public ResponseEntity<?> createProductCategory(@RequestHeader("Authorization") String token, @RequestBody OrderRequestDTO requestDTO) {
		try {
			ProductValidationResponseDTO resp = productClient.validateOrderItems(new OrderItemsDTO(requestDTO.Items));
			
			if(resp.Products.size() != requestDTO.Items.size()) {
				System.out.println(resp.Products.size());
				System.out.println("LALA"  + requestDTO.Items.size());
                return new ResponseEntity<>("Invalid order items", HttpStatus.BAD_REQUEST);
			}
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			
			return new ResponseEntity<>(orderService.createOrder(requestDTO, resp, objectId), HttpStatus.CREATED);
		} catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	else if(e.status() == HttpStatus.BAD_REQUEST.value())
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}  
	
	@GetMapping("/unconfirmed")
    @CrossOrigin
    public ResponseEntity<?> getUnconfirmedOrdersForObject(@RequestHeader("Authorization") String token) {
    	try {
    		JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			
            return new ResponseEntity<>(orderService.getUnconfirmedOrdersForObject(objectId), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PutMapping("/{orderId}/reject")
    @CrossOrigin
    public ResponseEntity<?> rejectOrder(@RequestHeader("Authorization") String token,@PathVariable String orderId) {

        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			
        	orderService.rejectOrder(UUID.fromString(orderId),objectId);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PutMapping("/accept")
    @CrossOrigin
    public ResponseEntity<?> acceptOrder(@RequestHeader("Authorization") String token,@RequestBody AcceptOrderDTO acceptOrderDTO) {

        try {		
        	
        	orderService.acceptOrder(acceptOrderDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@GetMapping("/confirmed")
    @CrossOrigin
    public ResponseEntity<?> getConfirmedOrdersForObject(@RequestHeader("Authorization") String token) {
    	try {
    		JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			
            return new ResponseEntity<>(orderService.getConfirmedOrdersForObject(objectId), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PutMapping("/{orderId}/ready")
    @CrossOrigin
    public ResponseEntity<?> setOrderToReady(@PathVariable String orderId) {
        try {
			
        	orderService.setOrderToReady(UUID.fromString(orderId));
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@GetMapping("/ready")
    @CrossOrigin
    public ResponseEntity<?> getReadyOrdersForObject(@RequestHeader("Authorization") String token) {
    	try {
    		JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			
            return new ResponseEntity<>(orderService.getReadyOrdersForObject(objectId), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PutMapping("/{orderId}/on-route")
    @CrossOrigin
    public ResponseEntity<?> setOnRouteOrder(@PathVariable String orderId) {

        try {
        	orderService.setOnRouteOrder(UUID.fromString(orderId));
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@GetMapping("/on-route")
    @CrossOrigin
    public ResponseEntity<?> getOnRouteOrdersForObject(@RequestHeader("Authorization") String token) {
    	try {
    		JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			
            return new ResponseEntity<>(orderService.getOnRouteOrdersForObject(objectId), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PutMapping("/{orderId}/completed")
    @CrossOrigin
    public ResponseEntity<?> setCompleteOrder(@PathVariable String orderId) {

        try {
        	orderService.setOrderToComplete(UUID.fromString(orderId));
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
