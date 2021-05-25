package NoWaiter.ProductService.entities;

import javax.persistence.Embeddable;

@Embeddable
public class MeasureUnit {

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
