package NoWaiter.AuthService.security;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import NoWaiter.AuthService.services.contracts.dto.JwtParseResponseDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenUtils {
	
	@Value("spring-security-example")
	private String APP_NAME;
	
	@Value("somesecret")
	public String SECRET;
	
	@Value("3600000") // 1 hour
	private int EXPIRES_IN;
	
	@Value("31556952000") // 1 year
	private long SELF_ORDER_EXPIRES_IN;
	
	@Value("Authorization")
	private String AUTH_HEADER;
	
	// Moguce je generisati JWT za razlicite klijente (npr. web i mobilni klijenti nece imati isto trajanje JWT, JWT za mobilne klijente ce trajati duze jer se mozda aplikacija redje koristi na taj nacin)
	//private static final String AUDIENCE_UNKNOWN = "unknown";
	private static final String AUDIENCE_WEB = "web";
	private static final String AUDIENCE_MOBILE = "mobile";
	private static final String AUDIENCE_TABLET = "tablet";
	
	// Algoritam za potpisivanje JWT
	private SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS512;
	
	public String generateToken(String username, UUID userId, List<String> authorities) {
		return Jwts.builder()
				.setIssuer(APP_NAME)
				.setSubject(username)
				.setAudience(generateAudience())
				.setIssuedAt(new Date())
				.setExpiration(generateExpirationDate())
				.claim("authorities", authorities) //moguce je postavljanje proizvoljnih podataka u telo JWT tokena
				.claim("userId", userId.toString()) 
				.signWith(SIGNATURE_ALGORITHM, SECRET).compact();
	}
	
	private String generateAudience() {
//		Moze se iskoristiti org.springframework.mobile.device.Device objekat za odredjivanje tipa uredjaja sa kojeg je zahtev stigao.
		
//		String audience = AUDIENCE_UNKNOWN;
//		if (device.isNormal()) {
//			audience = AUDIENCE_WEB;
//		} else if (device.isTablet()) {
//			audience = AUDIENCE_TABLET;
//		} else if (device.isMobile()) {
//			audience = AUDIENCE_MOBILE;
//		}
		return AUDIENCE_WEB;
	}
	
	private Date generateExpirationDate() {
		return new Date(new Date().getTime() + EXPIRES_IN);
	}
	
	// Funkcija za refresh JWT tokena
		public String refreshToken(String token) {
			String refreshedToken;
			try {
				final Claims claims = this.getAllClaimsFromToken(token);
				claims.setIssuedAt(new Date());
				refreshedToken = Jwts.builder()
						.setClaims(claims)
						.setExpiration(generateExpirationDate())
						.signWith(SIGNATURE_ALGORITHM, SECRET).compact();
			} catch (Exception e) {
				refreshedToken = null;
			}
			return refreshedToken;
		}

		public boolean canTokenBeRefreshed(String token, Date lastPasswordReset) {
			final Date created = this.getIssuedAtDateFromToken(token);
			return (!(this.isCreatedBeforeLastPasswordReset(created, lastPasswordReset))
					&& (!(this.isTokenExpired(token)) || this.ignoreTokenExpiration(token)));
		}

		// Funkcija za validaciju JWT tokena
		public Boolean validateToken(String token, UserDetails userDetails) {
			final String username = getUsernameFromToken(token);
			return (username != null && username.equals(userDetails.getUsername()));
		}

		//TODO: Za dusana get userId from token
		public UUID getUserIdFromToken(String token) {
			String userId;
			try {
				final Claims claims = this.getAllClaimsFromToken(token);
				userId = claims.get("userId", String.class);
			} catch (Exception e) {
				userId = null;
			}
			return userId == null ? null : UUID.fromString(userId);
		}
		
		public String getUsernameFromToken(String token) {
			String username;
			try {
				final Claims claims = this.getAllClaimsFromToken(token);
				username = claims.getSubject();
			} catch (Exception e) {
				username = null;
			}
			return username;
		}
		
		@SuppressWarnings("unchecked")
		public List<String> getAuthorities(String token) {
			List<String> authorities;
			try {
				final Claims claims = this.getAllClaimsFromToken(token);
				authorities = claims.get("authorities", List.class);
			} catch (Exception e) {
				authorities = null;
			}
			return authorities;
		}

		public Date getIssuedAtDateFromToken(String token) {
			Date issueAt;
			try {
				final Claims claims = this.getAllClaimsFromToken(token);
				issueAt = claims.getIssuedAt();
			} catch (Exception e) {
				issueAt = null;
			}
			return issueAt;
		}

		public String getAudienceFromToken(String token) {
			String audience;
			try {
				final Claims claims = this.getAllClaimsFromToken(token);
				audience = claims.getAudience();
			} catch (Exception e) {
				audience = null;
			}
			return audience;
		}

		public Date getExpirationDateFromToken(String token) {
			Date expiration;
			try {
				final Claims claims = this.getAllClaimsFromToken(token);
				expiration = claims.getExpiration();
			} catch (Exception e) {
				expiration = null;
			}
			return expiration;
		}

		public int getExpiredIn() {
			return EXPIRES_IN;
		}

		// Funkcija za preuzimanje JWT tokena iz zahteva
		public String getToken(HttpServletRequest request) {
			String authHeader = getAuthHeaderFromHeader(request);

			// JWT se prosledjuje kroz header Authorization u formatu:
			// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
			if (authHeader != null && authHeader.startsWith("Bearer ")) {
				return authHeader.substring(7);
			}

			return null;
		}

		public String getAuthHeaderFromHeader(HttpServletRequest request) {
			return request.getHeader(AUTH_HEADER);
		}
		
		private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
			return (lastPasswordReset != null && created.before(lastPasswordReset));
		}

		private Boolean isTokenExpired(String token) {
			final Date expiration = this.getExpirationDateFromToken(token);
			return expiration.before(new Date());
		}

		private Boolean ignoreTokenExpiration(String token) {
			String audience = this.getAudienceFromToken(token);
			return (audience.equals(AUDIENCE_TABLET) || audience.equals(AUDIENCE_MOBILE));
		}

		// Funkcija za citanje svih podataka iz JWT tokena
		private Claims getAllClaimsFromToken(String token) {
			Claims claims;
			try {
				claims = Jwts.parser()
						.setSigningKey(SECRET)
						.parseClaimsJws(token)
						.getBody();
			} catch (Exception e) {
				claims = null;
			}
			return claims;
		}

		public JwtParseResponseDTO parseJwt(String token) {
			// TODO Auto-generated method stub
			return new JwtParseResponseDTO(getUserIdFromToken(token),getUsernameFromToken(token),getAuthorities(token));
		}

		public String generateSelfOrderingToken(UUID id, List<String> roles) {
			return Jwts.builder()
					.setIssuer(APP_NAME)
					.setAudience(generateAudience())
					.setIssuedAt(new Date())
					.setExpiration(new Date(new Date().getTime() + SELF_ORDER_EXPIRES_IN))
					.claim("authorities", roles) //moguce je postavljanje proizvoljnih podataka u telo JWT tokena
					.claim("userId", id) 
					.signWith(SIGNATURE_ALGORITHM, SECRET).compact();
		}
}
