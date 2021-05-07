package NoWaiter.UserService.api;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.UserService.intercomm.ObjectClient;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.AddAdminDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import feign.FeignException;

@RestController
@RequestMapping(value = "api/users")
public class Api {

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectClient objectClient;

    @PostMapping("/restaurant-admin")
    @CrossOrigin
    public ResponseEntity<?> CreateRestaurantAdmin(@RequestBody ObjectAdminDTO objectAdminDTO) {
        try {
        	
            objectClient.checkObject(objectAdminDTO.ObjectId);
            UUID adminId = userService.createRestaurantAdmin(objectAdminDTO);
            objectClient.addAdminToObject(new AddAdminDTO(objectAdminDTO.ObjectId, adminId));
            
            return new ResponseEntity<>(adminId, HttpStatus.CREATED);
        } catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Invalid restaurant id: " + objectAdminDTO.ObjectId, HttpStatus.BAD_REQUEST);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping
    @CrossOrigin
    public ResponseEntity<?> test() {
    	return new ResponseEntity<>("USAO",HttpStatus.CREATED);
    }
}
