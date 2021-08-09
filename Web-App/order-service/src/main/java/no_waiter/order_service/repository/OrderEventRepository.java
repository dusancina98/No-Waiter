package no_waiter.order_service.repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import no_waiter.order_service.entities.OrderEvent;

public interface OrderEventRepository extends PagingAndSortingRepository<OrderEvent, UUID> {
	
	@Query(value = "SELECT distinct(oe.order.id) FROM OrderEvent oe WHERE oe.objectId = ?1 and oe.createdTime >= ?2")
	List<UUID> getOrderIdsForObjectAfterDate(UUID objectId, Date timeStamp);

	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.order.id = ?1")
	List<OrderEvent> getOrderEventsByOrderId(UUID orderId);
	
	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.orderStatus = 'CONFIRMED' and oe.createdTime >= ?1 and oe.order.orderType = 'DELIVERY'"
				 + " AND oe.order.id NOT IN (SELECT oe.order.id FROM OrderEvent oe WHERE oe.orderStatus = 'CONFIRMED_DELIVERY' and oe.createdTime >= ?1)")
	List<OrderEvent> getConfirmedOrderEventsForDelivery(Date timeStamp);
	
	@Query(value = "SELECT distinct(oe.objectId) FROM OrderEvent oe WHERE oe.orderStatus = 'CONFIRMED' and oe.createdTime >= ?1 and oe.order.orderType = 'DELIVERY'"
				+ " AND oe.order.id NOT IN (SELECT oe.order.id FROM OrderEvent oe WHERE oe.orderStatus = 'CONFIRMED_DELIVERY' and oe.createdTime >= ?1)")
	List<UUID> getDistinctObjectIdsForDelivery(Date timeStamp);
	
	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.orderStatus = 'CONFIRMED_DELIVERY' and oe.delivererId = ?1 and oe.order.orderType = 'DELIVERY'"
			 + " AND oe.order.id NOT IN (SELECT oe.order.id FROM OrderEvent oe WHERE oe.orderStatus = 'DELIVERING')")
	List<OrderEvent> getAcceptedOrderEventsForDeliveryByDeliverer(UUID delivererId);
	
	@Query(value = "SELECT distinct(oe.objectId) FROM OrderEvent oe WHERE oe.orderStatus = 'CONFIRMED_DELIVERY' and oe.delivererId = ?1 and oe.order.orderType = 'DELIVERY'"
			 + " AND oe.order.id NOT IN (SELECT oe.order.id FROM OrderEvent oe WHERE oe.orderStatus = 'DELIVERING')")
	List<UUID> getDistinctObjectIdsForAcceptedDelivery(UUID delivererId);
	
	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.order.id = ?1 and oe.orderStatus = 'CONFIRMED_DELIVERY' and oe.delivererId = ?2 and oe.order.orderType = 'DELIVERY'"
			 + " AND oe.order.id IN (SELECT oe.order.id FROM OrderEvent oe WHERE oe.order.id = ?1 and ( oe.orderStatus = 'CONFIRMED_DELIVERY' or oe.orderStatus = 'READY'))"
			 + " AND oe.order.id NOT IN (SELECT oe.order.id FROM OrderEvent oe WHERE oe.order.id = ?1 and oe.orderStatus = 'DELIVERING')")
	OrderEvent getLastConfirmedDeliveryOrderEventForOrder(UUID orderId, UUID delivererId);
	
	
	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.orderStatus = 'DELIVERING' and oe.delivererId = ?1 and oe.order.orderType = 'DELIVERY'"
			 + " AND oe.order.id NOT IN (SELECT oe.order.id FROM OrderEvent oe WHERE oe.orderStatus = 'COMPLETED')")
	List<OrderEvent> getPickedUpOrderEventsForDeliveryByDeliverer(UUID delivererId);
	
	@Query(value = "SELECT distinct(oe.objectId) FROM OrderEvent oe WHERE oe.orderStatus = 'DELIVERING' and oe.delivererId = ?1 and oe.order.orderType = 'DELIVERY'"
			 + " AND oe.order.id NOT IN (SELECT oe.order.id FROM OrderEvent oe WHERE oe.orderStatus = 'COMPLETED')")
	List<UUID> getDistinctObjectIdsFortPickedUpDelivery(UUID delivererId);

}
