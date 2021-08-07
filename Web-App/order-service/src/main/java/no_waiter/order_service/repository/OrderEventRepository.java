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
	
	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.orderStatus = 'CONFIRMED' and oe.createdTime >= ?1 and oe.order.orderType = 'DELIVERY'")
	List<OrderEvent> getConfirmedOrderEventsForDelivery(Date timeStamp);
	
	@Query(value = "SELECT distinct(oe.objectId) FROM OrderEvent oe WHERE oe.orderStatus = 'CONFIRMED' and oe.createdTime >= ?1 and oe.order.orderType = 'DELIVERY'")
	List<UUID> getDistinctObjectIdsForDelivery(Date timeStamp);
}
