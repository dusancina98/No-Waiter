package NoWaiter.UserService.api;

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
import NoWaiter.UserService.services.contracts.dto.RestaurantAdminDTO;
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
    public ResponseEntity<?> CreateRestaurantAdmin(@RequestBody RestaurantAdminDTO restaurantAdminDTO) {
    	System.out.println("USAOOOOOO\n\n\n\n USAOOOOOO");
        try {
        	System.out.println("Rest " + restaurantAdminDTO.RestaurantId);
            if(!objectClient.checkObject(restaurantAdminDTO.RestaurantId))
                return new ResponseEntity<>("Invalid restaurant id",HttpStatus.BAD_REQUEST);

            userService.createRestaurantAdmin(restaurantAdminDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);

        } catch (FeignException e) {
        	System.out.println(e.getMessage());
        	System.out.println(e.status());

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
