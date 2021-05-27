package NoWaiter.ObjectService.services.contracts.dto;

import java.util.Map;

import NoWaiter.ObjectService.entities.WeekDay;

public class WorkTimeDTO {
	public Map<WeekDay, WorkDayDTO> WorkDays;

	public WorkTimeDTO() {
		super();
	}

	public WorkTimeDTO(Map<WeekDay, WorkDayDTO> workDays) {
		super();
		this.WorkDays = workDays;
	}
	
	
}
