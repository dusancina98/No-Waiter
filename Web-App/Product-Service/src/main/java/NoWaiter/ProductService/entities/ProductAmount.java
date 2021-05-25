package NoWaiter.ProductService.entities;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;

@Embeddable
public class ProductAmount {

	@Embedded
	private MeasureUnit measureUnit;
	
	private int amount;

	public ProductAmount() {
	}
	
	public ProductAmount(int amount, String name) {
		this.measureUnit = new MeasureUnit(name);
		this.amount = amount;
	}

	public MeasureUnit getMeasureUnit() {
		return measureUnit;
	}

	public void setMeasureUnit(MeasureUnit measureUnit) {
		this.measureUnit = measureUnit;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
}
