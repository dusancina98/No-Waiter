package NoWaiter.FeedbackService.entities;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.Embeddable;

@Embeddable
public class FeedbackId implements Serializable{

	private static final long serialVersionUID = 1L;

	private UUID entityId;
	
	private UUID initiatorId;
	
	public FeedbackId() {}

	public FeedbackId(UUID entityId, UUID initiatorId) {
		super();
		this.entityId = entityId;
		this.initiatorId = initiatorId;
	}

	public UUID getEntityId() {
		return entityId;
	}

	public void setEntityId(UUID entityId) {
		this.entityId = entityId;
	}

	public UUID getInitiatorId() {
		return initiatorId;
	}

	public void setInitiatorId(UUID initiatorId) {
		this.initiatorId = initiatorId;
	}
	
	
}
