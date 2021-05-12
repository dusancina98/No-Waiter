package NoWaiter.UserService.entities;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class AccountActivation {
	@Id
    @Column(name = "id")
	private UUID id;
	
    @ManyToOne(fetch = FetchType.EAGER)
    private User userId;
    
    @Column(name= "generationDate", nullable = false)
    private Date generationDate;
    
    @Column(name= "expirationDate", nullable = false)
    private Date expirationDate;
    
    @Column(name="used", nullable = false)
    private boolean used;

	public AccountActivation() {
		super();
	}

	public AccountActivation(UUID id, User userId, Date generationDate, Date expirationDate, boolean used) {
		super();
		this.id = id;
		this.userId = userId;
		this.generationDate = generationDate;
		this.expirationDate = expirationDate;
		this.used = used;
	}
	
	public AccountActivation(User userId, Date generationDate) {
		super();
		this.id = UUID.randomUUID();
		this.userId = userId;
		this.generationDate = generationDate;
		this.expirationDate = generateExpirationDate(generationDate);
		this.used = false;
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
}
