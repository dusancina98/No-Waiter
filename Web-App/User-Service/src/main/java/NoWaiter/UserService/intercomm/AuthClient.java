package NoWaiter.UserService.intercomm;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient("auth-service")
public interface AuthClient {

	@PostMapping("api/auth/check-auth")
	void getLoggedUserInfo(@RequestHeader("Authorization") String token);
}
