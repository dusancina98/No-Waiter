package NoWaiter.AuthService.services.implementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NoWaiter.AuthService.repository.UserRepository;
import NoWaiter.AuthService.services.contracts.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UUID GetUserIdByEmail(String email) {
		return userRepository.findByEmail(email).getId();
	}

}
