package NoWaiter.ObjectService.entities;

import java.time.LocalTime;

import javax.persistence.Embeddable;

import NoWaiter.ObjectService.services.contracts.exceptions.InvalidTimeRangeException;


@Embeddable
public class WorkDay {
	private WeekDay weekDay;
	
	private boolean working;
	
	private LocalTime timeFrom;
	
	private LocalTime timeTo;
	
	public WorkDay() {
		super();
		// TODO Auto-generated constructor stub
	}

	public WorkDay(WeekDay weekDay, boolean working, LocalTime timeFrom, LocalTime timeTo) throws InvalidTimeRangeException {
		super();
		this.weekDay = weekDay;
		this.working = working;
		this.timeFrom = timeFrom;
		this.timeTo = timeTo;
		checkTimeRange(timeFrom,timeTo);
	}

	private void checkTimeRange(LocalTime timeFrom, LocalTime timeTo) throws InvalidTimeRangeException {
		if(timeFrom.getHour() == timeTo.getHour() && timeFrom.getMinute() >= timeTo.getMinute()) 
			throw new InvalidTimeRangeException("Time from is after time to");
		
		if(timeFrom.getHour() > timeTo.getHour())
			throw new InvalidTimeRangeException("Time from is after time to");
	}

	public WeekDay getWeekDay() {
		return weekDay;
	}

	public void setWeekDay(WeekDay weekDay) {
		this.weekDay = weekDay;
	}

	public boolean isWorking() {
		return working;
	}

	public void setWorking(boolean working) {
		this.working = working;
	}

	public LocalTime getTimeFrom() {
		return timeFrom;
	}

	public void setTimeFrom(LocalTime timeFrom) {
		this.timeFrom = timeFrom;
	}

	public LocalTime getTimeTo() {
		return timeTo;
	}

	public void setTimeTo(LocalTime timeTo) {
		this.timeTo = timeTo;
	}
	
	public boolean isWorkingNow() {
		if(!working)
			return working;
		
		LocalTime now = LocalTime.now();
		
		boolean isBetween = ( ! now.isBefore(timeTo)  
                && 
                now.isBefore(timeFrom));
		
		return isBetween;
	}
}
