package NoWaiter.UserService.api;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.UserService.entities.User;
import NoWaiter.UserService.intercomm.ObjectClient;
import NoWaiter.UserService.security.TokenUtils;
import NoWaiter.UserService.security.auth.JwtAuthenticationRequest;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.AddAdminDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.UserTokenStateDTO;
import feign.FeignException;

@RestController
@RequestMapping(value = "api/users")
public class Api {

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectClient objectClient;
    
	@Autowired
	private TokenUtils tokenUtils;

	@Autowired
	private AuthenticationManager authenticationManager;
    

    @PostMapping("/object-admin")
    @CrossOrigin
    public ResponseEntity<?> CreateRestaurantAdmin(@RequestBody ObjectAdminDTO objectAdminDTO) {
        try {
        	
            objectClient.checkObject(objectAdminDTO.ObjectId);
            UUID adminId = userService.CreateRestaurantAdmin(objectAdminDTO);
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
    
    @GetMapping
    @CrossOrigin
    public ResponseEntity<?> test() {
    	return new ResponseEntity<>("USAO",HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    @CrossOrigin
	public ResponseEntity<UserTokenStateDTO> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
			HttpServletResponse response) {
		System.out.println("USAO");

    	
		String jwt;
		int expiresIn;
		List<String> roles = new ArrayList<String>();

		System.out.println(authenticationRequest.getUsername());
		System.out.println(authenticationRequest.getPassword());
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
							authenticationRequest.getPassword()));

			System.out.println("test1235");
			SecurityContextHolder.getContext().setAuthentication(authentication);
			User user = (User) authentication.getPrincipal();
			user.getUserAuthorities().forEach((a) -> roles.add(a.getName()));
			jwt = tokenUtils.generateToken(user.getUsername(),roles); // username
			expiresIn = tokenUtils.getExpiredIn();

			List<String> getRoles= tokenUtils.getAuthorities(jwt);
			for(String s : getRoles) {
				System.out.println("ROLAA: " + s);
			}
		} catch (BadCredentialsException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		//if (userService.IsFirstPassword(authenticationRequest))
		//	return new ResponseEntity<>(HttpStatus.FOUND);
		
		return new ResponseEntity<UserTokenStateDTO>(new UserTokenStateDTO(jwt, expiresIn, roles), HttpStatus.OK);
	}
    
}
