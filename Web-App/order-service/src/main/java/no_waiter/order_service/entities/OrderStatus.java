package no_waiter.order_service.entities;

public enum OrderStatus {
	UNCONFIRMED,
	REJECTED,
	CONFIRMED,
	CONFIRMED_DELIVERY,
	READY,
	DELIVERING,
	COMPLETED,
}
