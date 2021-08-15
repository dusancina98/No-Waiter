package NoWaiter.AuthService.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.AuthService.entities.User;
import NoWaiter.AuthService.security.TokenUtils;
import NoWaiter.AuthService.services.contracts.UserService;
import NoWaiter.AuthService.services.contracts.dto.JwtAuthenticationRequest;
import NoWaiter.AuthService.services.contracts.dto.JwtParseRequestDTO;
import NoWaiter.AuthService.services.contracts.dto.JwtParseResponseDTO;
import NoWaiter.AuthService.services.contracts.dto.UserTokenStateDTO;

@RestController
@RequestMapping(value = "api/auth")
public class Api {
	
    public static final String HEADER = "Authorization";

    public static final String HEADER_VALUE_PREFIX = "Bearer";
    
    public static final String ROLE_DELIVERER = "ROLE_DELIVERER";
    
    public static final String ROLE_CUSTOMER = "ROLE_CUSTOMER";
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private TokenUtils tokenUtils;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
    @CrossOrigin
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
			HttpServletResponse response) {
		try {
			UserTokenStateDTO userTokenStateDTO = authenticate(authenticationRequest);

			if (!hasRole(userTokenStateDTO.getRoles(), "ROLE_SYSADMIN") && !hasRole(userTokenStateDTO.getRoles(), "ROLE_OBJADMIN") && !hasRole(userTokenStateDTO.getRoles(), "ROLE_WAITER"))
				return new ResponseEntity<>("Unauthorized access", HttpStatus.BAD_REQUEST);
			
			response.addHeader(HEADER, HEADER_VALUE_PREFIX + " " + userTokenStateDTO.getAccessToken());
			
			return new ResponseEntity<UserTokenStateDTO>(userTokenStateDTO, HttpStatus.OK);
		} catch (BadCredentialsException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch (DisabledException e) {
			UUID id = userService.getUserIdByEmail(authenticationRequest.getUsername());
			return new ResponseEntity<>(id,HttpStatus.FORBIDDEN);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	@PostMapping("/login/deliverer")
    @CrossOrigin
	public ResponseEntity<?> authenticateDeliverer(@RequestBody JwtAuthenticationRequest authenticationRequest,
			HttpServletResponse response) {
		try {
			UserTokenStateDTO userTokenStateDTO = authenticate(authenticationRequest);
			
			if (!hasRole(userTokenStateDTO.getRoles(), ROLE_DELIVERER))
				return new ResponseEntity<>("Unauthorized access", HttpStatus.BAD_REQUEST);
			
			response.addHeader(HEADER, HEADER_VALUE_PREFIX + " " + userTokenStateDTO.getAccessToken());
			
			return new ResponseEntity<UserTokenStateDTO>(userTokenStateDTO, HttpStatus.OK);
		} catch (BadCredentialsException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch (DisabledException e) {
			UUID id = userService.getUserIdByEmail(authenticationRequest.getUsername());
			return new ResponseEntity<>(id,HttpStatus.FORBIDDEN);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/login/customer")
    @CrossOrigin
	public ResponseEntity<?> authenticateCustomer(@RequestBody JwtAuthenticationRequest authenticationRequest,
			HttpServletResponse response) {
		try {
			UserTokenStateDTO userTokenStateDTO = authenticate(authenticationRequest);
			
			if (!hasRole(userTokenStateDTO.getRoles(), ROLE_CUSTOMER))
				return new ResponseEntity<>("Unauthorized access", HttpStatus.BAD_REQUEST);
			
			response.addHeader(HEADER, HEADER_VALUE_PREFIX + " " + userTokenStateDTO.getAccessToken());
			
			return new ResponseEntity<UserTokenStateDTO>(userTokenStateDTO, HttpStatus.OK);
		} catch (BadCredentialsException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch (DisabledException e) {
			UUID id = userService.getUserIdByEmail(authenticationRequest.getUsername());
			return new ResponseEntity<>(id,HttpStatus.FORBIDDEN);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	private UserTokenStateDTO authenticate(JwtAuthenticationRequest authenticationRequest) {
		List<String> roles = new ArrayList<String>();
		
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
						authenticationRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		User user = (User) authentication.getPrincipal();
		user.getUserAuthorities().forEach((a) -> roles.add(a.getName()));

		String jwt = tokenUtils.generateToken(user.getUsername(), user.getId() ,roles); 
		int expiresIn = tokenUtils.getExpiredIn();
		
		return new UserTokenStateDTO(jwt, new Date().getTime() + expiresIn, roles, user.getName(), user.getSurname());
		
	}
	
	private boolean hasRole(List<String> userRoles, String desiredRole) {
		for (String role : userRoles) {
			if (role.equals(desiredRole)) {
				return true;
			}
		}
		return false;
	}
    
    @PostMapping("/parse-jwt")
    @CrossOrigin
	public ResponseEntity<?> parseJWTToken(@RequestBody JwtParseRequestDTO requestDto) {
    	try {
            JwtParseResponseDTO jwtParseResponseDto = tokenUtils.parseJwt(requestDto.getToken());
            return new ResponseEntity<>(jwtParseResponseDto, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
	}
    
    @PostMapping("/user-jwt")
    @CrossOrigin
	public ResponseEntity<?> parseJWTToken(HttpServletRequest request) {
    	try {
            JwtParseResponseDTO jwtParseResponseDto = tokenUtils.parseJwt(tokenUtils.getToken(request));
            return new ResponseEntity<>(jwtParseResponseDto, HttpStatus.OK);

        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
	}
    
    @PostMapping("/selt-ordering-jwt-token")
    @CrossOrigin
	public ResponseEntity<?> generateSelfOrderingJWTToken(HttpServletRequest request) {
    	try {
            JwtParseResponseDTO jwtParseResponseDto = tokenUtils.parseJwt(tokenUtils.getToken(request));
    		List<String> roles = new ArrayList<String>();
    		roles.add("ROLE_SELF_ORDER_PULT");
			String jwt = tokenUtils.generateSelfOrderingToken(jwtParseResponseDto.getId() ,roles); 

            return new ResponseEntity<>(jwt, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
	}
}
