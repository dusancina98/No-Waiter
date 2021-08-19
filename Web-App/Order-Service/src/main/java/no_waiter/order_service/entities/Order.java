package no_waiter.order_service.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="Orders")
public class Order {

	@Id
    @Column(name = "id")
	private UUID id;

	private UUID objectId;

	@OneToMany(cascade={CascadeType.ALL})
	private List<OrderItem> items;
	
    @Enumerated(EnumType.STRING)
	@Column(name="order_type", nullable = false)
	private OrderType orderType;
    
    @Column(name = "table_id", nullable = true)
	private UUID tableId;
    
    @Column(name = "customer_id", nullable = true)
	private UUID customerId;
    
    @Embedded
    private Address address;
    
    private Date createdTime;
    
    private int estimatedTime;

    public Order() {}
    
	public Order(UUID id, UUID objectId, OrderType orderType, UUID tableId, Address address, int estimatedTime, Date createdTime, UUID customerId) {
		super();
		this.id = id;
		this.objectId = objectId;
		this.items = new ArrayList<OrderItem>();
		this.orderType = orderType;
		this.tableId = tableId;
		this.address = address;
		this.estimatedTime = estimatedTime;
		this.createdTime = createdTime;
		this.customerId = customerId;
	}
	
	public Order(UUID objectId, OrderType orderType, UUID tableId, Address address, int estimatedTime, UUID customerId) {
		this(UUID.randomUUID(), objectId, orderType, tableId, address, estimatedTime,new Date(), customerId);
	}

	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public OrderType getOrderType() {
		return orderType;
	}

	public void setOrderType(OrderType orderType) {
		this.orderType = orderType;
	}

	public UUID getTableId() {
		return tableId;
	}

	public void setTableId(UUID tableId) {
		this.tableId = tableId;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public UUID getId() {
		return id;
	}

	public UUID getObjectId() {
		return objectId;
	}

	public void setObjectId(UUID objectId) {
		this.objectId = objectId;
	}

	public int getEstimatedTime() {
		return estimatedTime;
	}

	public void setEstimatedTime(int estimatedTime) {
		this.estimatedTime = estimatedTime;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public UUID getCustomerId() {
		return customerId;
	}

	public void setCustomerId(UUID customerId) {
		this.customerId = customerId;
	}
	
	public double calculatePrice() {
		Double price=0.0;
		
		for(OrderItem orderItem: this.items) {
			price+= orderItem.getSingleItemPrice()*orderItem.getCount();
		}
		
		return price;
	}
}
