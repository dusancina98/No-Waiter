package no_waiter.order_service.repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import no_waiter.order_service.entities.OrderEvent;
import no_waiter.order_service.entities.OrderStatus;

public interface OrderEventRepository extends PagingAndSortingRepository<OrderEvent, UUID> {
	
	@Query(value = "SELECT distinct(oe.order.id) FROM OrderEvent oe WHERE oe.objectId = ?1 and oe.createdTime >= ?2")
	List<UUID> getOrderIdsForObjectAfterDate(UUID objectId, Date timeStamp);

	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.order.id = ?1")
	List<OrderEvent> getOrderEventsByOrderId(UUID orderId);
	
	//Latest status
	//@Query("SELECT oee FROM OrderEvent oee WHERE oee.order.id = oe.order.id and oe.createdTime = (SELECT max(oeee.createdTime) FROM OrderEvent oeee WHERE oeee.order.id = oee.order.id)")

	// ID: 1 TIME: 1000 STATUS: UNC
	// ID: 1 TIME: 1001 STATUS: CON
	// ID: 2 TIME: 1002 STATUS: UNC
	// ID: 2 TIME: 1003 STATUS: CON
	
	
	//
	
	@Query(value = "SELECT oee FROM OrderEvent oee WHERE oee.order.id = ?1 AND oee.orderStatus = ?2")
	OrderEvent getOrderEventByStatusAndOrderId(UUID orderId, OrderStatus orderStatus);
	
	@Query(value = "SELECT oee FROM OrderEvent oee WHERE " + 
			" oee.createdTime = (SELECT MAX(oeee.createdTime) FROM OrderEvent oeee WHERE oeee.order.id = oee.order.id) AND oee.orderStatus IN (?1) AND oee.order.orderType = 'DELIVERY'"
			+ "AND oee.order.id NOT IN (SELECT ord.order.id FROM OrderEvent ord WHERE ord.order.id = oee.order.id AND ord.orderStatus = 'CONFIRMED_DELIVERY')")
	List<OrderEvent> getOrderEventsForDeliverer(List<OrderStatus> orderStatus);
	
	@Query(value = "SELECT distinct(oee.objectId) FROM OrderEvent oee WHERE " + 
			" oee.createdTime = (SELECT MAX(oeee.createdTime) FROM OrderEvent oeee WHERE oeee.order.id = oee.order.id) AND oee.orderStatus IN (?1) AND oee.order.orderType = 'DELIVERY'"
			+ "AND oee.order.id NOT IN (SELECT ord.order.id FROM OrderEvent ord WHERE ord.order.id = oee.order.id AND ord.orderStatus = 'CONFIRMED_DELIVERY')")
	List<UUID> getDistinctObjectIdsForOrderDeliverer(List<OrderStatus> orderStatus);
	
	@Query(value = "SELECT oee FROM OrderEvent oee WHERE oee.order.id = ?1 AND" + 
			" oee.createdTime = (SELECT MAX(oeee.createdTime) FROM OrderEvent oeee WHERE oeee.order.id = oee.order.id)")
	OrderEvent getLastOrderEventForOrder(UUID orderId);
		
	@Query(value = "SELECT oee FROM OrderEvent oee WHERE " + 
			" oee.createdTime = (SELECT MAX(oeee.createdTime) FROM OrderEvent oeee WHERE oeee.order.id = oee.order.id) AND oee.orderStatus IN (?1) AND oee.order.orderType = 'DELIVERY'")
	List<OrderEvent> getOrderEventsForDelivery(List<OrderStatus> orderStatus);

	@Query(value = "SELECT distinct(oee.objectId) FROM OrderEvent oee WHERE " + 
			" oee.createdTime = (SELECT MAX(oeee.createdTime) FROM OrderEvent oeee WHERE oeee.order.id = oee.order.id) AND oee.orderStatus IN (?1) AND oee.order.orderType = 'DELIVERY'")
	List<UUID> getDistinctObjectIdsForOrderDelivery(List<OrderStatus> orderStatus);
	
	
	@Query(value = "SELECT oee FROM OrderEvent oee WHERE " + 
			" oee.createdTime = (SELECT MAX(oeee.createdTime) FROM OrderEvent oeee WHERE oeee.order.id = oee.order.id) AND oee.orderStatus IN (?1) AND oee.order.orderType = 'DELIVERY' AND oee.delivererId = ?2")
	List<OrderEvent> getOrderEventsForDeliveryByDeliverer(List<OrderStatus> orderStatus, UUID delivererId);

	@Query(value = "SELECT distinct(oee.objectId) FROM OrderEvent oee WHERE " + 
			" oee.createdTime = (SELECT MAX(oeee.createdTime) FROM OrderEvent oeee WHERE oeee.order.id = oee.order.id) AND oee.orderStatus IN (?1) AND oee.order.orderType = 'DELIVERY' AND oee.delivererId = ?2")
	List<UUID> getDistinctObjectIdsForOrderDeliveryByDeliverer(List<OrderStatus> orderStatus, UUID delivererId);
	


	
	
	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.order.id = ?1 and (oe.orderStatus = 'DELIVERING' or oe.orderStatus = 'CONFIRMED_DELIVERY')"
				+ " and oe.delivererId = ?2 and oe.order.orderType = 'DELIVERY'"
				+ " AND oe.order.id NOT IN (SELECT oee.order.id FROM OrderEvent oee WHERE oee.order.id = ?1 AND " 
			 	+ " oee.createdTime = (SELECT MAX(oeee.createdTime) FROM OrderEvent oeee WHERE oeee.order.id = oee.order.id) AND"
			 	+ " oee.orderStatus IN ('COMPLETED', 'CANCELED') AND oee.order.orderType = 'DELIVERY')")
	OrderEvent getNotFinishedOrderForDeliver(UUID orderId, UUID delivererId);
	
	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.order.id = ?1 and oe.orderStatus = 'READY' and oe.delivererId = ?2 and oe.order.orderType = 'DELIVERY'")
	OrderEvent getLastConfirmedDeliveryOrderEventForOrder(UUID orderId, UUID delivererId);

	@Query(value = "SELECT MAX(oe.ordinalNumber) FROM OrderEvent oe WHERE oe.objectId = ?1 "
			+ "AND oe.order.id not in (SELECT oee.order.id FROM OrderEvent oee WHERE oee.objectId = ?1 AND oee.orderStatus = 'COMPLETED')")
	int getMaxOrdinalNumberForObject(UUID objectId);
	
	@Query(value = "SELECT oe FROM OrderEvent oe WHERE oe.customerId = ?1 and oe.orderStatus IN ('COMPLETED', 'REJECTED') ORDER BY oe.createdTime DESC")
	List<OrderEvent> findAllCompletedOrderEventsForCustomer(UUID id);

	@Query(value = "SELECT distinct(oe.order.id) FROM OrderEvent oe WHERE oe.customerId = ?1 "
			+ "AND oe.order.id not in (SELECT oee.order.id FROM OrderEvent oee WHERE oee.orderStatus IN ('COMPLETED', 'REJECTED'))")
	List<UUID> findAllUnCompletedOrderEventsForCustomer(UUID id);
}


