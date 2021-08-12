package NoWaiter.ObjectService.entities;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Date;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import NoWaiter.ObjectService.services.contracts.dto.WorkDayDTO;
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

	public void Update(Map<WeekDay, WorkDayDTO> workDaysForUpdate) {
		// TODO Auto-generated method stub
		for (var entry : workDaysForUpdate.entrySet()) {
			WorkDay workDayForUpdate = workDays.get(entry.getKey());
			workDayForUpdate.setWorking(entry.getValue().Working);
			workDayForUpdate.setTimeFrom(entry.getValue().TimeFrom);
			workDayForUpdate.setTimeTo(entry.getValue().TimeTo);
		}
	}
	
	@SuppressWarnings("deprecation")
	public boolean isWorkingNow() {
        LocalDate localDate = LocalDate.now();

		DayOfWeek dayOfWeek = localDate.getDayOfWeek();
		WorkDay workDay = workDays.get(WeekDay.valueOf(dayOfWeek.toString().toUpperCase()));
		
		return workDay.isWorkingNow();
	}
}
