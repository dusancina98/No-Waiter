package NoWaiter.UserService.intercomm;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import NoWaiter.UserService.services.contracts.dto.JwtParseResponseDTO;

@FeignClient("auth-service")
public interface AuthClient {

	@PostMapping("api/auth/user-jwt")
	JwtParseResponseDTO getLoggedUserInfo(@RequestHeader("Authorization") String token);
	
	@PostMapping("api/auth/create-user")
	void createUser();

}
