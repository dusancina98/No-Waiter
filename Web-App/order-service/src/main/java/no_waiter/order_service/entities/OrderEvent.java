package no_waiter.order_service.entities;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="OrderEvents")
public class OrderEvent {
	
	@Id
    @Column(name = "id")
	private UUID id;
	
	@OneToOne
	private Order order;
	
	@Enumerated(EnumType.STRING)
	@Column(name="order_status", nullable = false)
	private OrderStatus orderStatus;
	
    @Column(name = "timestamp")
	private Date createdTime;
    
    @Column(name = "estimatedTime")
	private int estimatedTime;
    
    @Column(name = "objectId")
	private UUID objectId;
    
    @Column(name = "delivererId", nullable = true)
	private UUID delivererId;

	public OrderEvent() {
		super();
	}

	public OrderEvent(UUID id, Order order, OrderStatus orderStatus, Date createdTime, int estimatedTime, UUID objectId, UUID delivererId) {
		super();
		this.id = id;
		this.order = order;
		this.orderStatus = orderStatus;
		this.createdTime = createdTime;
		this.estimatedTime = estimatedTime;
		this.objectId = objectId;
		this.delivererId = delivererId;
	}

	public OrderEvent(Order order, OrderStatus orderStatus, Date timeStamp, int estimatedTime, UUID objectId, UUID delivererId) {
		this(UUID.randomUUID(), order, orderStatus, timeStamp, estimatedTime, objectId, delivererId);
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}


	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public int getEstimatedTime() {
		return estimatedTime;
	}

	public void setEstimatedTime(int estimatedTime) {
		this.estimatedTime = estimatedTime;
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

	public UUID getDelivererId() {
		return delivererId;
	}

	public void setDelivererId(UUID delivererId) {
		this.delivererId = delivererId;
	}
}
