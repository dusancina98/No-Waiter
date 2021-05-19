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
	
    private UUID userId;
    
    @Column(name= "generationDate", nullable = false)
    private Date generationDate;
    
    @Column(name= "expirationDate", nullable = false)
    private Date expirationDate;
    
    @Column(name="used", nullable = false)
    private boolean used;

	public AccountActivation() {
		super();
	}

	public AccountActivation(UUID id, UUID userId, Date generationDate, Date expirationDate, boolean used) {
		super();
		this.id = id;
		this.userId = userId;
		this.generationDate = generationDate;
		this.expirationDate = expirationDate;
		this.used = used;
	}
	
	public AccountActivation(UUID userId, Date generationDate) {
		super();
		this.id = UUID.randomUUID();
		this.userId = userId;
		this.generationDate = generationDate;
		this.expirationDate = generateExpirationDate(generationDate);
		this.used = false;
	}

	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
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
	
	
}
