package NoWaiter.AuthService.services.contracts;

import java.util.UUID;

public interface UserService {
    UUID GetUserIdByEmail(String email);
}
