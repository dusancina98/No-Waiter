package no_waiter.order_service.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class OrderItem {

	@Id
    @Column(name = "id")
	private UUID id;
	
	@Embedded
	private Product product;
	
	private String note;
	
	private int count;
	
	private double singleItemPrice;

	public OrderItem(UUID id, Product product, String note, int count, double singleItemPrice) {
		super();
		this.id = id;
		this.product = product;
		this.note = note;
		this.count = count;
		this.singleItemPrice = singleItemPrice;
	}
	
	public OrderItem(Product product, String note, int count, double singleItemPrice) {
		this(UUID.randomUUID(), product, note, count, singleItemPrice);
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public double getSingleItemPrice() {
		return singleItemPrice;
	}

	public void setSingleItemPrice(double singleItemPrice) {
		this.singleItemPrice = singleItemPrice;
	}

	public UUID getId() {
		return id;
	}
	
}
