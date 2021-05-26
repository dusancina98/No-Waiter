package NoWaiter.ObjectService.entities;

import java.util.List;
import java.util.UUID;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class WorkTime {
	@Id
    private UUID id;
	
	@ElementCollection
    private List<WorkDay> workDays;
	
	public WorkTime() {
		super();
	}

	public WorkTime(UUID id, List<WorkDay> workDays) {
		super();
		this.id = id;
		this.workDays = workDays;
	}
	
	public WorkTime(List<WorkDay> workDays) {
		this(UUID.randomUUID(),workDays);
	}

	public List<WorkDay> getWorkDays() {
		return workDays;
	}

	public void setWorkDays(List<WorkDay> workDays) {
		this.workDays = workDays;
	}

	public UUID getId() {
		return id;
	}
}
