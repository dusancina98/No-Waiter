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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.UserService.entities.AccountActivationToken;
import NoWaiter.UserService.entities.ResetPasswordToken;
import NoWaiter.UserService.intercomm.AuthClient;
import NoWaiter.UserService.intercomm.ObjectClient;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.AddAdminDTO;
import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.JwtParseResponseDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.RequestEmailDTO;
import NoWaiter.UserService.services.contracts.dto.RequestIdDTO;
import NoWaiter.UserService.services.contracts.dto.ResetPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.TokenDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateWaiterDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsedException;
import NoWaiter.UserService.services.contracts.exceptions.NonExistentUserEmailException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordIsNotStrongException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordsIsNotTheSameException;
import NoWaiter.UserService.services.contracts.exceptions.ResetPasswordTokenExpiredOrUsedException;
import NoWaiter.UserService.services.contracts.exceptions.TokenNotFoundException;
import NoWaiter.UserService.services.contracts.exceptions.UserIsActiveException;
import feign.FeignException;

@RestController
@RequestMapping(value = "api/users")
public class Api {

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectClient objectClient;
    
    @Autowired
    private AuthClient authClient;
    
    @PutMapping("/objects")
    @CrossOrigin
    public ResponseEntity<?> updateObjects(@RequestBody UserClientObjectDTO userObjectDTO) {
        try {
        	userService.updateObjects(userObjectDTO);       
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/object-admin")
    @CrossOrigin
    public ResponseEntity<?> createRestaurantAdmin(@RequestBody ObjectAdminDTO objectAdminDTO) {
        try {
        	
            objectClient.checkObject(objectAdminDTO.ObjectId);
            UUID adminId = userService.createObjectAdmin(objectAdminDTO);
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
    public ResponseEntity<?> updateRestaurantAdmin(@RequestBody IdentifiableDTO<UpdateObjectAdminRequestDTO> objectAdminDTO) {
        try {
        	userService.updateObjectAdmin(objectAdminDTO);       
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @GetMapping("/object-admin")
    @CrossOrigin
    public ResponseEntity<?> findAllObjectAdmins() {
        try {
            return new ResponseEntity<>(userService.findAllObjectAdmins(), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/employee/waiter")
    @CrossOrigin
    public ResponseEntity<?> createWaiter(@RequestHeader("Authorization") String token, @RequestBody WaiterDTO waiterDTO) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
            return new ResponseEntity<>(userService.createWaiter(waiterDTO, jwtResponse.getId()), HttpStatus.CREATED);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/employee/waiter")
    @CrossOrigin
    public ResponseEntity<?> findAllWaitersForObject(@RequestHeader("Authorization") String token) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
            return new ResponseEntity<>(userService.findAllWaiters(jwtResponse.getId()), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/employee/waiter")
    @CrossOrigin
    public ResponseEntity<?> updateWaiter(@RequestBody IdentifiableDTO<UpdateWaiterDTO> waiterDTO) {
        try {
        	userService.updateWaiter(waiterDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping
    @CrossOrigin
    public ResponseEntity<?> test(@RequestHeader("Authorization") String token) {
    	System.out.println(token);
    	JwtParseResponseDTO parse = authClient.getLoggedUserInfo(token);
    	System.out.println(parse.getUsername() + "\n\n" + parse.getId());
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
    
    @GetMapping("/activate-user/token={token}")
    @CrossOrigin
    public ResponseEntity<?> activateUser(@PathVariable String token,HttpServletResponse httpServletResponse) {
        try {
        	UUID userId = userService.isUserFirstLogin(token);
        	if(userId!=null) {
        		httpServletResponse.setHeader("Location", "http://localhost:3000/index.html#/first-login-password/" + userId + "/" + token);
                httpServletResponse.setStatus(302);
        	}else {
            	userService.activateUser(token);
            	httpServletResponse.setHeader("Location", "http://localhost:3000/index.html#/login");
                httpServletResponse.setStatus(302);
        	}

            return new ResponseEntity<>(HttpStatus.PERMANENT_REDIRECT);
        } catch(ActivationLinkExpiredOrUsedException e) {
        	//TODO 1: izmeniti u neku stranicu za token je istekao
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
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }catch(PasswordIsNotStrongException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }catch(ActivationLinkExpiredOrUsedException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }catch(TokenNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
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
    
    @PostMapping("/reset-password")
    @CrossOrigin
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        try {
        	userService.resetPassword(resetPasswordDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(PasswordsIsNotTheSameException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }catch(PasswordIsNotStrongException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }catch(ResetPasswordTokenExpiredOrUsedException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }catch(TokenNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/check-if-activation-token-valid")
    @CrossOrigin
    public ResponseEntity<?> checkIfActivationTokenValid(@RequestBody TokenDTO tokenDTO) {
        try {
        	AccountActivationToken token=  userService.isValidAccountActivationLink(tokenDTO.token);
        	if(token==null)
        		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        	else 
        		return new ResponseEntity<>(HttpStatus.OK);
        }catch(TokenNotFoundException e) {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch(Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/check-if-reset-password-token-valid")
    @CrossOrigin
    public ResponseEntity<?> checkIfResetPasswordTokenValid(@RequestBody TokenDTO tokenDTO) {
        try {
        	ResetPasswordToken token=  userService.isValidResetPasswordToken(tokenDTO.token);
        	if(token==null)
        		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        	else 
        		return new ResponseEntity<>(HttpStatus.OK);
        }catch(TokenNotFoundException e) {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch(Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}