package NoWaiter.AuthService.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import NoWaiter.AuthService.entities.User;
import NoWaiter.AuthService.repository.UserRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService {


	@Autowired
	private UserRepository userRepository;

	// Funkcija koja na osnovu username-a iz baze vraca objekat User-a
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);
		System.out.println("TESTTT");
		if (user == null) {
			System.out.println("TESTTT1");
			throw new UsernameNotFoundException(String.format("No user found with username '%s'.", email));
		} else {
			System.out.println("TESTTT2");
			return user;
		}
	}

}