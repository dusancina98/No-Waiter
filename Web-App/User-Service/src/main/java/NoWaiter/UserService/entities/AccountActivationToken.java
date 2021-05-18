package NoWaiter.UserService.entities;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.google.common.hash.Hashing;

@Entity
public class AccountActivationToken {
	@Id
    @Column(name = "id")
	private UUID id;
	
    @Column(name = "token")
	private String token;
	
    @ManyToOne(fetch = FetchType.EAGER)
    private User userId;
    
    @Column(name= "generationDate", nullable = false)
    private Date generationDate;
    
    @Column(name= "expirationDate", nullable = false)
    private Date expirationDate;
    
    @Column(name="used", nullable = false)
    private boolean used;

	public AccountActivationToken() {
		super();
	}

	public AccountActivationToken(UUID id,String token, User userId, Date generationDate, Date expirationDate, boolean used) {
		super();
		this.id = id;
		this.token=token;
		this.userId = userId;
		this.generationDate = generationDate;
		this.expirationDate = expirationDate;
		this.used = used;
	}
	
	public AccountActivationToken(User userId, Date generationDate) throws NoSuchAlgorithmException {
		super();
		this.id = UUID.randomUUID();
		this.token= generateToken();
		this.userId = userId;
		this.generationDate = generationDate;
		this.expirationDate = generateExpirationDate(generationDate);
		this.used = false;
	}

	private String generateToken() throws NoSuchAlgorithmException {
		// TODO Auto-generated method stub
		
		String sha256hex = Hashing.sha256()
				  .hashString(UUID.randomUUID().toString(), StandardCharsets.UTF_8)
				  .toString();
		return sha256hex;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Date getGenerationDate() {
		return generationDate;
	}

	public void setGenerationDate(Date generationDate) {
		this.generationDate = generationDate;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public boolean isUsed() {
		return used;
	}

	public void setUsed(boolean used) {
		this.used = used;
	}
	
	private Date generateExpirationDate(Date generationDate) {
		return new Date(generationDate.getTime() + (30 * 60 * 1000));
	}

	public UUID getId() {
		return id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
	
	
}
