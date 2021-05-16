package NoWaiter.UserService.api;

import java.util.UUID;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.UserService.intercomm.ObjectClient;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.AddAdminDTO;
import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.RequestEmailDTO;
import NoWaiter.UserService.services.contracts.dto.RequestIdDTO;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsed;
import NoWaiter.UserService.services.contracts.exceptions.NonExistentUserEmailException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordIsNotStrongException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordsIsNotTheSameException;
import NoWaiter.UserService.services.contracts.exceptions.UserIsActiveException;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
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
    
    @GetMapping("/check-existence/{userId}")
    @CrossOrigin
    public ResponseEntity<?> checkUserExistence(@PathVariable UUID userId) {
        try {
            return new ResponseEntity<>(userService.checkUserExistance(userId), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/activation-link-request")
    @CrossOrigin
    public ResponseEntity<?> createActivationLink(@RequestBody RequestIdDTO requestIdDTO) {
        try {
        	userService.createActivationLink(requestIdDTO.id);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(UserIsActiveException ee) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/activate-user/{activationId}")
    @CrossOrigin
    public ResponseEntity<?> activateUser(@PathVariable UUID activationId,HttpServletResponse httpServletResponse) {
        try {
        	
        	UUID userId = userService.isUserFirstLogin(activationId);
        	if(userId!=null) {
        		httpServletResponse.setHeader("Location", "http://localhost:3000/index.html#/first-login-password/" + userId);
                httpServletResponse.setStatus(302);
        	}else {
            	userService.activateUser(activationId);
            	httpServletResponse.setHeader("Location", "http://localhost:3000/index.html#/login");
                httpServletResponse.setStatus(302);
        	}

            return new ResponseEntity<>(HttpStatus.PERMANENT_REDIRECT);
        } catch(ActivationLinkExpiredOrUsed e) {
            httpServletResponse.setHeader("Location", "http://localhost:3000/index.html#/404");
            httpServletResponse.setStatus(302);
            return new ResponseEntity<>(HttpStatus.PERMANENT_REDIRECT);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/change-first-password")
    @CrossOrigin
    public ResponseEntity<?> changeFirstPassword(@RequestBody ChangeFirstPasswordDTO changeFirstPasswordDTO) {
        try {
        	userService.changeFirstPassword(changeFirstPasswordDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(PasswordsIsNotTheSameException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch(PasswordIsNotStrongException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/reset-password-link-request")
    @CrossOrigin
    public ResponseEntity<?> resetPasswordLinkRequest(@RequestBody RequestEmailDTO requestEmailDTO) {
        try {
        	userService.resetPasswordLinkRequest(requestEmailDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(NonExistentUserEmailException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch(Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}