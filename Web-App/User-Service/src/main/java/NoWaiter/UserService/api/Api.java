package NoWaiter.UserService.api;

import java.util.NoSuchElementException;
import java.util.UUID;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import NoWaiter.UserService.services.contracts.DelivererService;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.AddAdminDTO;
import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.CustomerDTO;
import NoWaiter.UserService.services.contracts.dto.DelivererRequestDTO;
import NoWaiter.UserService.services.contracts.dto.EditCustomerDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.JwtParseResponseDTO;
import NoWaiter.UserService.services.contracts.dto.NameDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.RejectDelivererDTO;
import NoWaiter.UserService.services.contracts.dto.RequestEmailDTO;
import NoWaiter.UserService.services.contracts.dto.RequestIdDTO;
import NoWaiter.UserService.services.contracts.dto.ResetPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.TokenDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateWaiterDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;
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
    private DelivererService delivererService;
    
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
        }catch (ConstraintViolationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
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
                return new ResponseEntity<>("Invalid restaurant id: " + objectAdminDTO.ObjectId, HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (ConstraintViolationException | ClassFieldValidationException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (DataIntegrityViolationException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getRootCause().getMessage(), HttpStatus.CONFLICT);
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
		} catch (ConstraintViolationException | ClassFieldValidationException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
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
    
    @DeleteMapping("/object-admin/{adminId}")
    @CrossOrigin
    public ResponseEntity<?> deleteObjectAdmin(@PathVariable UUID adminId) {
        try {
        	objectClient.deleteObjectAdmin(adminId);
        	userService.deleteObjectAdmin(adminId);
        	
            return new ResponseEntity<>(HttpStatus.OK);
        }  catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Invalid object admin id: " + adminId, HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/customer")
    @CrossOrigin
    public ResponseEntity<?> editCustomer(@RequestHeader("Authorization") String token, @RequestBody EditCustomerDTO customerDTO) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
        	userService.updateCustomer(customerDTO, jwtResponse.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @GetMapping("/customer/addresses")
    @CrossOrigin
    public ResponseEntity<?> getLoggedCustomerAddresses(@RequestHeader("Authorization") String token) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
            return new ResponseEntity<>(userService.getLoggedCustomerAddresses(jwtResponse.getId()), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/customer/address")
    @CrossOrigin
    public ResponseEntity<?> addLoggedCustomerAddresses(@RequestHeader("Authorization") String token, @RequestBody NameDTO addressDTO) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
            return new ResponseEntity<>(userService.addCustomerAddress(jwtResponse.getId(), addressDTO), HttpStatus.CREATED);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/customer/objects/favourite/{objectId}")
    @CrossOrigin
    public ResponseEntity<?> addObjectToFavourites(@RequestHeader("Authorization") String token, @PathVariable UUID objectId) {
        try {
        	objectClient.checkObject(objectId);

        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
        	userService.addObjectToCustomerFavourites(jwtResponse.getId(), objectId);
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
        		return new ResponseEntity<>("Invalid object id: " + objectId, HttpStatus.NOT_FOUND);
    	
        	return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/customer/objects/favourite/{objectId}")
    @CrossOrigin
    public ResponseEntity<?> removeObjectFromCustomerFavourites(@RequestHeader("Authorization") String token, @PathVariable UUID objectId) {
        try {
        	objectClient.checkObject(objectId);

        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
        	userService.removeObjectFromCustomerFavourites(jwtResponse.getId(), objectId);
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
        		return new ResponseEntity<>("Invalid object id: " + objectId, HttpStatus.NOT_FOUND);
    	
        	return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/customer/address/{addressId}")
    @CrossOrigin
    public ResponseEntity<?> removeLoggedCustomerAddresses(@RequestHeader("Authorization") String token, @PathVariable UUID addressId) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
        	userService.deleteCustomerAddress(jwtResponse.getId(), addressId);
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/customer/info")
    @CrossOrigin
    public ResponseEntity<?> getLoggedCustomerInfo(@RequestHeader("Authorization") String token) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
            return new ResponseEntity<>(userService.getLoggedCustomer(jwtResponse.getId()), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/customer")
    @CrossOrigin
    public ResponseEntity<?> createCustomer(@RequestBody CustomerDTO customerDTO) {
        try {
            return new ResponseEntity<>(userService.createCustomer(customerDTO), HttpStatus.CREATED);
        } catch (ConstraintViolationException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (ClassFieldValidationException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (DataIntegrityViolationException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getRootCause().getMessage(), HttpStatus.CONFLICT);
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
        } catch (ConstraintViolationException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (ClassFieldValidationException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (DataIntegrityViolationException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getRootCause().getMessage(), HttpStatus.CONFLICT);
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
    
    @GetMapping("/employee/waiter/{waiterId}/object-id")
    @CrossOrigin
    public ResponseEntity<?> findObjectIdByWaiterId(@PathVariable UUID waiterId) {
        try {
            return new ResponseEntity<>(userService.findObjectIdByWaiterId(waiterId), HttpStatus.OK);
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
        } catch (ConstraintViolationException | ClassFieldValidationException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
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
        } catch (Exception e) {
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
    
    @PostMapping("/deliverer-request")
    @CrossOrigin
    public ResponseEntity<?> createDelivererRequest(@RequestBody DelivererRequestDTO delivererRequestDTO) {
        try {
            UUID requestId = delivererService.createDelivererRequest(delivererRequestDTO);
            
            return new ResponseEntity<>(requestId, HttpStatus.CREATED);
       } catch (ConstraintViolationException | ClassFieldValidationException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (DataIntegrityViolationException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getRootCause().getMessage(), HttpStatus.CONFLICT);
		} catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/deliverer-request")
    @CrossOrigin
    public ResponseEntity<?> getDelivererRequest() {
    	try {
            return new ResponseEntity<>(delivererService.getAllPendingRequests(), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/deliverer-request/approve/{requestId}")
    @CrossOrigin
    public ResponseEntity<?> approveDelivererRequest(@PathVariable UUID requestId) {
        try {
        	delivererService.approveDelivererRequest(requestId);    
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }catch (DataIntegrityViolationException | ConstraintViolationException | ClassFieldValidationException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/deliverer-request/reject")
    @CrossOrigin
    public ResponseEntity<?> rejectDelivererRequest(@RequestBody RejectDelivererDTO rejectDelivererDTO) {
        try {
        	delivererService.rejectDelivererRequest(rejectDelivererDTO);    
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/deliverers")
    @CrossOrigin
    public ResponseEntity<?> getDeliverers() {
    	try {
            return new ResponseEntity<>(delivererService.getAllDeliverer(), HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/deliverers/{delivererId}/activate")
    @CrossOrigin
    public ResponseEntity<?> activateDeliverer(@PathVariable UUID delivererId) {

        try {
            delivererService.activateDeliverer(delivererId);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/deliverers/{delivererId}/deactivate")
    @CrossOrigin
    public ResponseEntity<?> deactivateDeliverer(@PathVariable UUID delivererId) {

        try {
            delivererService.deactivateDeliverer(delivererId);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/deliverers/{delivererId}")
    @CrossOrigin
    public ResponseEntity<?> deleteDeliverer(@PathVariable UUID delivererId) {

        try {
            delivererService.deleteDeliverer(delivererId);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
	 @DeleteMapping("/object-workers/{objectId}")
	 @CrossOrigin
	    public ResponseEntity<?> deleteObjectWorkers(@PathVariable UUID objectId) {

	        try {
	        	userService.deleteObjectWorkers(objectId);
	            return new ResponseEntity<>(HttpStatus.OK);

	        } catch (NoSuchElementException e) {
	        	e.printStackTrace();
	            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
	        } catch (Exception e) {
	        	e.printStackTrace();
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
    
    @DeleteMapping("/employee/waiter/{waiterId}")
    @CrossOrigin
    public ResponseEntity<?> deleteWaiter(@PathVariable UUID waiterId) {

        try {
            userService.deleteWaiter(waiterId);
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