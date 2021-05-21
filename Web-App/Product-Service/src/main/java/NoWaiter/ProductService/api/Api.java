package NoWaiter.ProductService.api;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.ProductService.intercomm.AuthClient;
import NoWaiter.ProductService.intercomm.ObjectClient;
import NoWaiter.ProductService.services.contracts.ProductService;
import NoWaiter.ProductService.services.contracts.dto.CategoryDTO;
import NoWaiter.ProductService.services.contracts.dto.JwtParseResponseDTO;
import feign.FeignException;


@RestController
@RequestMapping(value = "api/products")
public class Api {

	@Autowired
	private AuthClient authClient;
	
	@Autowired
	private ObjectClient objectClient;
	
	@Autowired
	private ProductService productService;
	
	@PutMapping("/categories")
	@CrossOrigin
	public ResponseEntity<?> createProductCategory(@RequestHeader("Authorization") String token, @RequestBody CategoryDTO categoryDTO) {
		try {
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			return new ResponseEntity<>(productService.createProductCategory(categoryDTO, objectId), HttpStatus.CREATED);
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
