package NoWaiter.FeedbackService.entities;

import java.util.Date;
import java.util.UUID;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import NoWaiter.FeedbackService.services.contracts.exceptions.ClassFieldValidationException;


@Entity
public class Feedback {
	  
	  private int grade;
	  
	  private Date date;
	  
	    @Enumerated(EnumType.STRING)
	  private FeedbackType feedbackType;
	  
	  @EmbeddedId
	  private FeedbackId feedbackId;

	  public Feedback() {}
	  
	  public Feedback(int grade, FeedbackType feedbackType, UUID entityId, UUID initiatorId) throws ClassFieldValidationException {
		super();
		this.grade = grade;
		this.date = new Date();
		this.feedbackType = feedbackType;
		this.feedbackId = new FeedbackId(entityId, initiatorId);
		validate();
	  }

	  public void validate() throws ClassFieldValidationException {	    	
	    	if(this.grade < 1 || this.grade > 5)
	    		throw new ClassFieldValidationException("Grade must be between 1 and 5");
	  }
	  
	  public int getGrade() {
		  return grade;
	  }

	  public void setGrade(int grade) {
		  this.grade = grade;
	  }

	  public Date getDate() {
		  return date;
	  }

	  public void setDate(Date date) {
		  this.date = date;
	  }

	  public FeedbackType getFeedbackType() {
		  return feedbackType;
	  }

	  public void setFeedbackType(FeedbackType feedbackType) {
		this.feedbackType = feedbackType;
	  }

	  public UUID getEntityId() {
			return this.feedbackId.getEntityId();
	  }



		public UUID getInitiatorId() {
			return this.feedbackId.getInitiatorId();
		}
}
