package NoWaiter.AuthService.api;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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
import NoWaiter.AuthService.services.contracts.dto.JwtAuthenticationRequest;
import NoWaiter.AuthService.services.contracts.dto.JwtParseRequestDTO;
import NoWaiter.AuthService.services.contracts.dto.JwtParseResponseDTO;
import NoWaiter.AuthService.services.contracts.dto.UserTokenStateDTO;

@RestController
@RequestMapping(value = "api/auth")
public class Api {
	
    public static final String HEADER = "Authorization";

    public static final String HEADER_VALUE_PREFIX = "Bearer";
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private TokenUtils tokenUtils;
	
	@PostMapping("/login")
    @CrossOrigin
	public ResponseEntity<UserTokenStateDTO> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
			HttpServletResponse response) {
		String jwt;
		int expiresIn;
		List<String> roles = new ArrayList<String>();

		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
							authenticationRequest.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);
			User user = (User) authentication.getPrincipal();
			user.getUserAuthorities().forEach((a) -> roles.add(a.getName()));
			jwt = tokenUtils.generateToken(user.getUsername(),roles); // username
			expiresIn = tokenUtils.getExpiredIn();
		} catch (BadCredentialsException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
        response.addHeader(HEADER, HEADER_VALUE_PREFIX + " " + jwt);
		
		return new ResponseEntity<UserTokenStateDTO>(new UserTokenStateDTO(jwt, expiresIn, roles), HttpStatus.OK);
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
}
