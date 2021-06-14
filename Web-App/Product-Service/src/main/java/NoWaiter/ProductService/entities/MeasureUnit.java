package NoWaiter.ProductService.entities;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotEmpty;

@Embeddable
public class MeasureUnit {

	@NotEmpty(message = "Measure unit name is required")
	private String measureUnitName;
	
	public MeasureUnit() { }

	public MeasureUnit(String name) {
		super();
		this.measureUnitName = name;
	}

	public String getMeasureUnitName() {
		return measureUnitName;
	}

	public void setMeasureUnitName(String name) {
		this.measureUnitName = name;
	}
	
}
