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
import no_waiter.order_service.intercomm.ProductClient;
import no_waiter.order_service.intercomm.UserClient;
import no_waiter.order_service.services.contracts.OrderService;
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
}