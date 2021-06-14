package NoWaiter.ObjectService.services.contracts.dto;

import java.time.LocalTime;


public class WorkDayDTO {	
	public boolean Working;
	
	public LocalTime TimeFrom;
	
	public LocalTime TimeTo;
	
	public WorkDayDTO() {
		super();
	}

	public WorkDayDTO(boolean working, LocalTime timeFrom,
			LocalTime timeTo) {
		super();
		Working = working;
		TimeFrom = timeFrom;
		TimeTo = timeTo;
	}
	
	
}
