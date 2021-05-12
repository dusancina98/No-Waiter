package NoWaiter.UserService.api;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.UserService.intercomm.ObjectClient;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.AddAdminDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import feign.FeignException;

@RestController
@RequestMapping(value = "api/users")
public class Api {

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectClient objectClient;
    
    @PutMapping("/objects")
    @CrossOrigin
    public ResponseEntity<?> UpdateObjects(@RequestBody UserClientObjectDTO userObjectDTO) {
        try {
        	userService.UpdateObjects(userObjectDTO);       
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/object-admin")
    @CrossOrigin
    public ResponseEntity<?> CreateRestaurantAdmin(@RequestBody ObjectAdminDTO objectAdminDTO) {
        try {
        	
            objectClient.checkObject(objectAdminDTO.ObjectId);
            UUID adminId = userService.CreateObjectAdmin(objectAdminDTO);
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
    
    @PutMapping("/object-admin")
    @CrossOrigin
    public ResponseEntity<?> UpdateRestaurantAdmin(@RequestBody IdentifiableDTO<UpdateObjectAdminRequestDTO> objectAdminDTO) {
        try {
        	userService.UpdateObjectAdmin(objectAdminDTO);       
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @GetMapping("/object-admin")
    @CrossOrigin
    public ResponseEntity<?> FindAllObjectAdmins() {
        try {
            return new ResponseEntity<>(userService.FindAllObjectAdmins(), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/employee/waiter")
    @CrossOrigin
    public ResponseEntity<?> CreateWaiter(@RequestBody WaiterDTO waiterDTO) {
        try {
            return new ResponseEntity<>(userService.CreateWaiter(waiterDTO), HttpStatus.CREATED);
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