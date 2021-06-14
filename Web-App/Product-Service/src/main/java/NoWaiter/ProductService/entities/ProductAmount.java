package NoWaiter.ProductService.entities;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.validation.Valid;
import javax.validation.constraints.Min;

@Embeddable
public class ProductAmount {

	@Embedded
	@Valid
	private MeasureUnit measureUnit;
	
	@Min(value = 1, message = "Product amount must be greater than zero")
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
