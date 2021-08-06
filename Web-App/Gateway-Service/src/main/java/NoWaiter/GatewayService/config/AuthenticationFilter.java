package NoWaiter.GatewayService.config;

import java.io.IOException;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import NoWaiter.GatewayService.dto.JwtParseRequestDTO;
import NoWaiter.GatewayService.dto.JwtParseResponseDTO;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

	public static final String HEADER = "Authorization";

    public static final String HEADER_VALUE_PREFIX = "Bearer";

    private static final String JWT_PARSE_URL = "http://auth-service/api/auth/parse-jwt";

    private final RestTemplate restTemplate;

    public AuthenticationFilter(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = request.getHeader(HEADER);
		System.out.println("TEST1");
        if (token != null) {
            token = token.replace(HEADER_VALUE_PREFIX + " ", "");

            try {
                JwtParseResponseDTO responseDto = parseJwt(token);

                for(String str : responseDto.getAuthorities()) {
                	System.out.println("ROLAAAAAAA" + str);
                }
                
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        responseDto.getUsername(),
                        null,
                        responseDto.getAuthorities().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
                );
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception ignore) {
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
	}
	
	private JwtParseResponseDTO parseJwt(String token) {
        JwtParseResponseDTO responseDto = restTemplate.postForObject(JWT_PARSE_URL, new JwtParseRequestDTO(token),
                JwtParseResponseDTO.class);

        Objects.requireNonNull(responseDto);
        return responseDto;
    }
}
