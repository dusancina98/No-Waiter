package NoWaiter.ObjectService.entities;

import java.util.Map;
import java.util.UUID;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import NoWaiter.ObjectService.services.contracts.exceptions.InvalidTimeRangeException;

@Entity
public class WorkTime {
	@Id
    private UUID id;
	
	@ElementCollection
    @CollectionTable(name="WorkDays", joinColumns= @JoinColumn(name = "worktime_id", referencedColumnName = "id"))
    private Map<WeekDay, WorkDay> workDays;
	
	public WorkTime(){
		super();
	}

	public WorkTime(UUID id, Map<WeekDay, WorkDay> workDays) {
		super();
		this.id = id;
		this.workDays= workDays;
	}
	
	public WorkTime(Map<WeekDay, WorkDay> workDays) {
		this(UUID.randomUUID(), workDays);
	}

	public Map<WeekDay, WorkDay> getWorkDays() {
		return workDays;
	}
	
	/*private Map<WeekDay, WorkDay> generateDefaultWorkDays() throws InvalidTimeRangeException {
		Map<WeekDay, WorkDay> retVal = new HashMap<WeekDay,WorkDay>();
		retVal.put(WeekDay.MONDAY, new WorkDay(WeekDay.MONDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.MONDAY, new WorkDay(WeekDay.TUESDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.MONDAY, new WorkDay(WeekDay.WEDNESDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.MONDAY, new WorkDay(WeekDay.THURSDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.MONDAY, new WorkDay(WeekDay.FRIDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.MONDAY, new WorkDay(WeekDay.SATURDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		retVal.put(WeekDay.MONDAY, new WorkDay(WeekDay.SUNDAY, false, LocalTime.of(9, 00), LocalTime.of(17, 00)));
		return retVal;
	}*/

	public UUID getId() {
		return id;
	}

	public void addWorkDay(WorkDay workDay) throws InvalidTimeRangeException {
		workDays.put(workDay.getWeekDay(),workDay);
	}
}