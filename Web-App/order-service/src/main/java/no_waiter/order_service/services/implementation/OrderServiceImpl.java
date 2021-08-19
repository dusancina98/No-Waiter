package no_waiter.order_service.services.implementation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.aop.AopInvocationException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.itextpdf.text.DocumentException;

import javassist.NotFoundException;
import no_waiter.order_service.entities.Address;
import no_waiter.order_service.entities.Order;
import no_waiter.order_service.entities.OrderEvent;
import no_waiter.order_service.entities.OrderItem;
import no_waiter.order_service.entities.OrderStatus;
import no_waiter.order_service.entities.OrderType;
import no_waiter.order_service.entities.Product;
import no_waiter.order_service.intercomm.ObjectClient;
import no_waiter.order_service.intercomm.ProductClient;
import no_waiter.order_service.intercomm.UserClient;
import no_waiter.order_service.repository.OrderEventRepository;
import no_waiter.order_service.repository.OrderRepository;
import no_waiter.order_service.services.contracts.OrderService;
import no_waiter.order_service.services.contracts.dto.AcceptOrderDTO;
import no_waiter.order_service.services.contracts.dto.CompletedOrderDTO;
import no_waiter.order_service.services.contracts.dto.ConfirmedOrderDTO;
import no_waiter.order_service.services.contracts.dto.CustomerObjectIdOrderDTO;
import no_waiter.order_service.services.contracts.dto.CustomerOrderDTO;
import no_waiter.order_service.services.contracts.dto.CustomerOrderItemDTO;
import no_waiter.order_service.services.contracts.dto.DelivererOrderDTO;
import no_waiter.order_service.services.contracts.dto.ObjectDetailsDTO;
import no_waiter.order_service.services.contracts.dto.OnRouteOrderDTO;
import no_waiter.order_service.services.contracts.dto.OrderCustomerRequestDTO;
import no_waiter.order_service.services.contracts.dto.OrderDetailsDTO;
import no_waiter.order_service.services.contracts.dto.OrderItemDTO;
import no_waiter.order_service.services.contracts.dto.OrderItemResponseDTO;
import no_waiter.order_service.services.contracts.dto.OrderItemsDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;
import no_waiter.order_service.services.contracts.dto.ReadyOrderDTO;
import no_waiter.order_service.services.contracts.dto.TableResponseDTO;
import no_waiter.order_service.services.contracts.dto.UnConfirmedOrderDTO;
import no_waiter.order_service.services.contracts.exceptions.CustomerPenaltiesBlockedException;
import no_waiter.order_service.services.contracts.exceptions.RejectOrderException;
import no_waiter.order_service.services.implementation.util.OrderMapper;
import no_waiter.order_service.services.implementation.util.OrderReportPDFGenerator;
import no_waiter.order_service.services.implementation.util.QrCodeGenerator;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderEventRepository orderEventRepository;
	
	@Autowired
	private ProductClient productClient;
	
	@Autowired
	private ObjectClient objectClient;
	
	@Autowired
	private UserClient userClient;
	
	@Override
	public UUID createOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId) {
		Order order = OrderMapper.MapOrderRequestDTOToOrder(requestDTO, products, objectId, null);
		orderRepository.save(order);
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.CONFIRMED, new Date(), order.getEstimatedTime(), objectId, null, 0,null);
		orderEventRepository.save(newOrderEvent);
	
		return order.getId();
	}
	
	@Override
	public UUID createOrderCustomer(OrderCustomerRequestDTO requestDTO, ProductValidationResponseDTO products,
			UUID customerId) throws CustomerPenaltiesBlockedException {
		int penalties = userClient.getPenaltiesForCustomer(customerId);

		if(penalties>=3) {
			throw new CustomerPenaltiesBlockedException("Customer is blocked because has 3 penalties");
		}
		
		Order order = OrderMapper.MapOrderRequestDTOToOrder(requestDTO, products, requestDTO.ObjectId, customerId);
		orderRepository.save(order);
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.UNCONFIRMED, new Date(), order.getEstimatedTime(), requestDTO.ObjectId, null, 0,customerId);
		orderEventRepository.save(newOrderEvent);
		
		return order.getId();
	}
	
	@Override
	public UUID createOrderForInfoPult(OrderRequestDTO requestDTO, ProductValidationResponseDTO resp,
			UUID objectId) throws Exception {
		Order order = OrderMapper.MapOrderRequestDTOToOrder(requestDTO, resp, objectId, null);
		orderRepository.save(order);
		
		int ordinalNumber=  calculateOrderOrdinalNumberFromObject(objectId);

		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.UNCONFIRMED, new Date(), order.getEstimatedTime(), objectId, null, ordinalNumber, null);
		orderEventRepository.save(newOrderEvent);
		
		return order.getId();
	}
	
	@Override
	public List<UnConfirmedOrderDTO> getUnconfirmedOrdersForObject(UUID objectId) {
		List<UnConfirmedOrderDTO> unConfirmedOrderDTO = new ArrayList<UnConfirmedOrderDTO>();
				
		for(UUID orderId : orderEventRepository.getOrderIdsForObjectAfterDate(objectId, getDateAfterGetOrders())) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.UNCONFIRMED)) 
				unConfirmedOrderDTO.add((UnConfirmedOrderDTO) mapOrderToOrderDTOFromOrderStatus(orderEvent.get(0),OrderStatus.UNCONFIRMED));
		}
		
		return unConfirmedOrderDTO;
	}

	
	@Override
	public List<ConfirmedOrderDTO> getConfirmedOrdersForObject(UUID objectId) {
		List<ConfirmedOrderDTO> confirmedOrderDTO = new ArrayList<ConfirmedOrderDTO>();
		
		for(UUID orderId : orderEventRepository.getOrderIdsForObjectAfterDate(objectId, getDateAfterGetOrders())) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.CONFIRMED)) {
				confirmedOrderDTO.add((ConfirmedOrderDTO) mapOrderToOrderDTOFromOrderStatus(orderEvent.get(0),OrderStatus.CONFIRMED));
			}
		}
		
		return confirmedOrderDTO;
	}
	

	@Override
	public void rejectOrder(UUID orderId) throws RejectOrderException {		
		OrderEvent latest = orderEventRepository.getLastOrderEventForOrder(orderId);
		
		if(latest.getCustomerId() != null) {
			if(latest.getOrderStatus() != OrderStatus.CANCELED && latest.getOrderStatus() != OrderStatus.DELIVERING && latest.getOrderStatus() != OrderStatus.COMPLETED) {
				OrderEvent newOrderEvent = new OrderEvent(latest.getOrder(), OrderStatus.REJECTED, new Date(), latest.getOrder().getEstimatedTime(), latest.getObjectId(), null,latest.getOrdinalNumber(),latest.getCustomerId());
				orderEventRepository.save(newOrderEvent);
				userClient.incrementCustomerPenalties(latest.getCustomerId());
			}else {
				throw new RejectOrderException("Not possible to reject order");
			}
		}else if(latest.getOrderStatus() != OrderStatus.CANCELED && latest.getOrderStatus() != OrderStatus.COMPLETED) {
			OrderEvent newOrderEvent = new OrderEvent(latest.getOrder(), OrderStatus.REJECTED, new Date(), latest.getOrder().getEstimatedTime(), latest.getObjectId(), null,latest.getOrdinalNumber(),latest.getCustomerId());
			orderEventRepository.save(newOrderEvent);
		}else {
			throw new RejectOrderException("Not possible to reject order");
		}
	}

	@Override
	public void acceptOrder(AcceptOrderDTO acceptOrderDTO) {
		Order order = orderRepository.findById(acceptOrderDTO.OrderId).get();
		
		order.setEstimatedTime(acceptOrderDTO.EstimatedTime);
		orderRepository.save(order);
		
		OrderEvent latest = orderEventRepository.getLastOrderEventForOrder(acceptOrderDTO.OrderId);
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.CONFIRMED, new Date(), acceptOrderDTO.EstimatedTime, order.getObjectId(), null, latest.getOrdinalNumber(),latest.getCustomerId());
		orderEventRepository.save(newOrderEvent);
	}
	

	@Override
	public void acceptOrderDeliverer(AcceptOrderDTO acceptOrderDTO, UUID delivererId) {
		Order order = orderRepository.findById(acceptOrderDTO.OrderId).get();
		
		order.setEstimatedTime(acceptOrderDTO.EstimatedTime);
		orderRepository.save(order);
		
		OrderEvent latest = orderEventRepository.getLastOrderEventForOrder(acceptOrderDTO.OrderId);
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.CONFIRMED_DELIVERY, new Date(), acceptOrderDTO.EstimatedTime, order.getObjectId(), delivererId,latest.getOrdinalNumber(),latest.getCustomerId());
		orderEventRepository.save(newOrderEvent);		
	}
	

	@Override
	public void pickupOrderDeliverer(UUID orderId, UUID delivererId) throws NotFoundException {
		OrderEvent orderEvent = orderEventRepository.getLastOrderEventForOrder(orderId);
		OrderEvent readyevent = orderEventRepository.getOrderEventByStatusAndOrderId(orderId, OrderStatus.READY);
		
		if (orderEvent == null || readyevent == null) {
			throw new NotFoundException("Order not found");
		}
		
		if ((!orderEvent.getOrderStatus().equals(OrderStatus.CONFIRMED_DELIVERY) && !orderEvent.getOrderStatus().equals(OrderStatus.READY)) || !orderEvent.getDelivererId().equals(delivererId)) {
			throw new NotFoundException("Order not found");
		}
		
		OrderEvent newOrderEvent = new OrderEvent(orderEvent.getOrder(), OrderStatus.DELIVERING, new Date(), orderEvent.getOrder().getEstimatedTime(), orderEvent.getOrder().getObjectId(), delivererId, orderEvent.getOrdinalNumber(),orderEvent.getCustomerId());
		orderEventRepository.save(newOrderEvent);	
	}

	@Override
	public UUID completeOrder(UUID orderId, UUID userId) throws NotFoundException {
		OrderEvent orderEvent = orderEventRepository.getLastOrderEventForOrder(orderId);
		
		if (!orderEvent.getOrderStatus().equals(OrderStatus.DELIVERING) || !orderEvent.getOrder().getCustomerId().equals(userId)) {
			throw new NotFoundException("Order not found");
		}
		
		OrderEvent newOrderEvent = new OrderEvent(orderEvent.getOrder(), OrderStatus.COMPLETED, new Date(), orderEvent.getOrder().getEstimatedTime(), orderEvent.getOrder().getObjectId(), orderEvent.getDelivererId() , orderEvent.getOrdinalNumber(), userId);
		orderEventRepository.save(newOrderEvent);
		return orderEvent.getDelivererId();
	}

	@Override
	public void cancelOrderDeliverer(UUID orderId, UUID delivererId) throws NotFoundException {
		OrderEvent latest = orderEventRepository.getLastOrderEventForOrder(orderId);
		if (latest == null) {
			throw new NotFoundException("Order not found");
		}
		
		if (!latest.getDelivererId().equals(delivererId) || (!latest.getOrderStatus().equals(OrderStatus.CONFIRMED_DELIVERY) && !latest.getOrderStatus().equals(OrderStatus.READY))) {
			throw new NotFoundException("Order not found");
		}
		
		OrderEvent newOrderEvent = new OrderEvent(latest.getOrder(), OrderStatus.CANCELED, new Date(), latest.getOrder().getEstimatedTime(), latest.getOrder().getObjectId(), null, latest.getOrdinalNumber(),latest.getCustomerId());
		orderEventRepository.save(newOrderEvent);			
	}
	
	@Override
	public void dismissOrderDeliverer(UUID orderId, UUID delivererId) throws NotFoundException {
		OrderEvent latest = orderEventRepository.getLastOrderEventForOrder(orderId);
		if (latest == null) {
			throw new NotFoundException("Order not found");
		}
		
		if (!latest.getDelivererId().equals(delivererId) || !latest.getOrderStatus().equals(OrderStatus.DELIVERING)) {
			throw new NotFoundException("Order not found");
		}
		
		OrderEvent newOrderEvent = new OrderEvent(latest.getOrder(), OrderStatus.DISMISSED, new Date(), latest.getOrder().getEstimatedTime(), latest.getOrder().getObjectId(), delivererId, latest.getOrdinalNumber(),latest.getCustomerId());
		orderEventRepository.save(newOrderEvent);			
	}
	
	@Override
	public void setOrderToReady(UUID orderId) {
		Order order = orderRepository.findById(orderId).get();
	
		OrderEvent latest = orderEventRepository.getLastOrderEventForOrder(orderId);
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.READY, new Date(), order.getEstimatedTime(), order.getObjectId(), latest.getDelivererId(),latest.getOrdinalNumber(),latest.getCustomerId());
		orderEventRepository.save(newOrderEvent);
	}

	@Override
	public List<ReadyOrderDTO> getReadyOrdersForObject(UUID objectId) {
		List<ReadyOrderDTO> readyOrderDTO = new ArrayList<ReadyOrderDTO>();
				
		for(UUID orderId : orderEventRepository.getOrderIdsForObjectAfterDate(objectId, getDateAfterGetOrders())) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.READY)) {
				readyOrderDTO.add((ReadyOrderDTO) mapOrderToOrderDTOFromOrderStatus(orderEvent.get(0),OrderStatus.READY));
			}
		}
		
		return readyOrderDTO;
	}

	@Override
	public byte[] setOnRouteOrder(UUID orderId) throws Exception {
		Order order = orderRepository.findById(orderId).get();
		
		OrderEvent latest = orderEventRepository.getLastOrderEventForOrder(orderId);
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.DELIVERING, new Date(), order.getEstimatedTime(), order.getObjectId(), null, latest.getOrdinalNumber(),latest.getCustomerId());
		orderEventRepository.save(newOrderEvent);

		QrCodeGenerator qrCodeGenerator = new QrCodeGenerator();
		byte[] qrCode=  qrCodeGenerator.generateQrCode(order.getId().toString());
		
		OrderReportPDFGenerator pdfGenerator = new OrderReportPDFGenerator(order,qrCode, order.getAddress().getAddress());
		
		return pdfGenerator.generateWaiterOrderReport();
	}

	@Override
	public List<OnRouteOrderDTO> getOnRouteOrdersForObject(UUID objectId) {
		List<OnRouteOrderDTO> onRouteOrderDTO = new ArrayList<OnRouteOrderDTO>();
		
		List<UUID> getOrderIdsForObjectAfterDate =  orderEventRepository.getOrderIdsForObjectAfterDate(objectId, getDateAfterGetOrders());
		
		for(UUID orderId : getOrderIdsForObjectAfterDate) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.DELIVERING)) {
				onRouteOrderDTO.add((OnRouteOrderDTO) mapOrderToOrderDTOFromOrderStatus(orderEvent.get(0),OrderStatus.DELIVERING));
			}
		}
		
		return onRouteOrderDTO;
	}

	@Override
	public void setOrderToComplete(UUID orderId) {		
		OrderEvent latest = orderEventRepository.getLastOrderEventForOrder(orderId);
		OrderEvent newOrderEvent = new OrderEvent(latest.getOrder(), OrderStatus.COMPLETED, new Date(), latest.getOrder().getEstimatedTime(), latest.getOrder().getObjectId(), null, latest.getOrdinalNumber(),latest.getCustomerId());
		orderEventRepository.save(newOrderEvent);	
	}

	@Override
	public List<CompletedOrderDTO> getCompletedOrdersForObject(UUID objectId) {
		List<CompletedOrderDTO> completedOrderDTO = new ArrayList<CompletedOrderDTO>();
				
		for(UUID orderId : orderEventRepository.getOrderIdsForObjectAfterDate(objectId, getDateAfterGetOrders())) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.COMPLETED)) {
				completedOrderDTO.add((CompletedOrderDTO) mapOrderToOrderDTOFromOrderStatus(orderEvent.get(0),OrderStatus.COMPLETED));
			}
		}
		
		return completedOrderDTO;
	}

	@Override
	public OrderDetailsDTO getOrderDetails(UUID orderId) {
		Order order = orderRepository.findById(orderId).get();
		
		List<OrderItemResponseDTO> orderItems = OrderMapper.MapOrderItemsToOrderItemsResponseDTO(order.getItems());

		int tableNumber=1;
		if(order.getOrderType().equals(OrderType.ORDER_INSIDE) && order.getTableId() != null) {
			tableNumber = objectClient.getTableNumberByTableIdForResturant(order.getObjectId(), order.getTableId());
		}
		
		OrderDetailsDTO retVal = new OrderDetailsDTO(order.getId(),order.getCreatedTime(),order.getAddress().getAddress(),calculateEstimatedDate(order.getCreatedTime(), order.getEstimatedTime()),order.getOrderType().toString(),new TableResponseDTO(order.getTableId(),tableNumber),order.calculatePrice(),orderItems, getOrderStatusByOrderId(order.getId()));
				
		return retVal;
	}

	@Override
	public void updateOrder(OrderDetailsDTO orderDetailsDTO) {
		Order order = orderRepository.findById(orderDetailsDTO.OrderId).get();
		
		order.setAddress(new Address(orderDetailsDTO.Address));
		order.setOrderType(OrderType.valueOf(orderDetailsDTO.OrderType));
		order.setTableId(orderDetailsDTO.Table.Id);
		
		removeOrderItems(order,orderDetailsDTO.OrderItems);
		addOrderItems(order,orderDetailsDTO.OrderItems);
		
		orderRepository.save(order);
	}

	//TODO: mozda refactor
	private void addOrderItems(Order order, List<OrderItemResponseDTO> orderItems) {
		 List<OrderItemDTO> newItems = new ArrayList<OrderItemDTO>();
		
		 for(OrderItemResponseDTO orderItemDTO : orderItems) {
			  boolean found = false;
			  for(OrderItem orderItem : order.getItems()) {
				  if(orderItem.getId().equals(orderItemDTO.Id)) {
					  orderItem.setCount(orderItemDTO.Count);
					  found = true;
				  }
			  }
			  if(!found) {
				  newItems.add(OrderMapper.MapOrderItemResponseDTOToOrderItemDTO(orderItemDTO));
			  }
		 }		 
		 
		 ProductValidationResponseDTO resp = productClient.validateOrderItems(new OrderItemsDTO(newItems));
			
		 if(resp.Products.size() == newItems.size()) {
			 for(ProductValidationDTO product : resp.Products) {
					for(OrderItemDTO item : newItems) {
						if (item.Id.equals(product.Id)) {
							order.getItems().add(new OrderItem(new Product(product.Id, product.Name, product.ImagePath), item.Note, item.Count, product.Price, OrderMapper.MapSideDishesDTOToSideDishes(product.SideDishes)));
						}
					}
				}
		 	} 
	}

	private void removeOrderItems(Order order, List<OrderItemResponseDTO> orderItems) {
		for(OrderItem orderItem : order.getItems()) {
			boolean found = false;
			for(OrderItemResponseDTO orderItemDTO : orderItems) {
				if(orderItem.getId().equals(orderItemDTO.Id)) {
					orderItem.setCount(orderItemDTO.Count);
					found = true;
				}
			}
			
			if(!found) {
				order.getItems().remove(orderItem);
			}
		}	
	}

	@Override
	public List<DelivererOrderDTO> getAllConfirmedOrders() {
		List<DelivererOrderDTO> confirmedOrderDTO = new ArrayList<DelivererOrderDTO>();
		
		List<OrderStatus> statuses = new ArrayList<OrderStatus>() {
			private static final long serialVersionUID = 1L;
			{
                add(OrderStatus.CANCELED);
                add(OrderStatus.CONFIRMED);
                add(OrderStatus.READY);
            };
		};
		
		List<OrderEvent> confirmedOrderEvents =  orderEventRepository.getOrderEventsForDeliverer(statuses);
		List<UUID> objectIds = orderEventRepository.getDistinctObjectIdsForOrderDeliverer(statuses);
		List<ObjectDetailsDTO> objectDetails = objectClient.getObjectDetailsByObjectIds(objectIds);
		
		confirmedOrderEvents.forEach((orderEvent) -> confirmedOrderDTO.add(OrderMapper.MapOrderToDelivererOrderDTO(orderEvent, objectDetails)));
		return confirmedOrderDTO;
	}	
	

	@Override
	public List<DelivererOrderDTO> getAllAcceptedOrders(UUID delivererId) {
		List<DelivererOrderDTO> acceptedOrderDTO = new ArrayList<DelivererOrderDTO>();
		
		List<OrderStatus> statuses = new ArrayList<OrderStatus>() {
			private static final long serialVersionUID = 1L;
			{
                add(OrderStatus.CONFIRMED_DELIVERY);
                add(OrderStatus.READY);
            };
		};
		List<OrderEvent> confirmedOrderEvents =  orderEventRepository.getOrderEventsForDeliveryByDeliverer(statuses, delivererId);
		List<UUID> objectIds = orderEventRepository.getDistinctObjectIdsForOrderDeliveryByDeliverer(statuses, delivererId);
		List<ObjectDetailsDTO> objectDetails = objectClient.getObjectDetailsByObjectIds(objectIds);

		confirmedOrderEvents.forEach((orderEvent) -> acceptedOrderDTO.add(OrderMapper.MapOrderToDelivererOrderDTO(orderEvent, objectDetails)));
		return acceptedOrderDTO;
	}

	@Override
	public byte[] generateReportPDF(String orderId) throws DocumentException, Exception {
		Order order = orderRepository.findById(UUID.fromString(orderId)).get();
		
		OrderEvent latestEvent = orderEventRepository.getLastOrderEventForOrder(UUID.fromString(orderId));
		OrderReportPDFGenerator pdfGenerator = new OrderReportPDFGenerator(order,latestEvent.getOrdinalNumber());

		return pdfGenerator.generateInfoPultReport();
	}


	@Override
	public List<DelivererOrderDTO> getAllPickedUpOrders(UUID delivererId) {
		List<DelivererOrderDTO> acceptedOrderDTO = new ArrayList<DelivererOrderDTO>();
		
		List<OrderStatus> statuses = new ArrayList<OrderStatus>() {
			private static final long serialVersionUID = 1L;
			{
                add(OrderStatus.DELIVERING);
            };
		};
		
		List<OrderEvent> confirmedOrderEvents =  orderEventRepository.getOrderEventsForDeliveryByDeliverer(statuses, delivererId);
		List<UUID> objectIds = orderEventRepository.getDistinctObjectIdsForOrderDeliveryByDeliverer(statuses, delivererId);
		List<ObjectDetailsDTO> objectDetails = objectClient.getObjectDetailsByObjectIds(objectIds);

		confirmedOrderEvents.forEach((orderEvent) -> acceptedOrderDTO.add(OrderMapper.MapOrderToDelivererOrderDTO(orderEvent, objectDetails)));
		return acceptedOrderDTO;
	}

	@Override
	public List<CustomerObjectIdOrderDTO> getCustomerOrderHistory(UUID id) {
		List<CustomerObjectIdOrderDTO> retVal = new ArrayList<CustomerObjectIdOrderDTO>();
		List<OrderEvent> customerOrders = orderEventRepository.findAllCompletedOrderEventsForCustomer(id);
	
		for(OrderEvent orderEvent : customerOrders) {
			List<CustomerOrderItemDTO> items = OrderMapper.MapOrderToCustomerOrderItemDTO(orderEvent.getOrder());
			retVal.add(new CustomerObjectIdOrderDTO(orderEvent.getOrder().getId(),objectClient.getObjectNameByObjectId(orderEvent.getObjectId()), orderEvent.getOrder().getOrderType(), orderEvent.getOrder().getAddress().getAddress(), orderEvent.getCreatedTime(),orderEvent.getOrder().calculatePrice(),items,orderEvent.getOrderStatus(), orderEvent.getObjectId()));
		}
		
		return retVal;
	}



	@Override
	public List<CustomerOrderDTO> getCustomerPendingOrders(UUID id) {
		List<CustomerOrderDTO> retVal = new ArrayList<CustomerOrderDTO>();
		
		List<UUID> customerOrderIds = orderEventRepository.findAllUnCompletedOrderEventsForCustomer(id);
		
		for(UUID orderId : customerOrderIds) {
			OrderEvent orderEvent=  orderEventRepository.getLastOrderEventForOrder(orderId);
			List<CustomerOrderItemDTO> items = OrderMapper.MapOrderToCustomerOrderItemDTO(orderEvent.getOrder());
			retVal.add(new CustomerOrderDTO(orderEvent.getOrder().getId(),objectClient.getObjectNameByObjectId(orderEvent.getObjectId()), orderEvent.getOrder().getOrderType(), orderEvent.getOrder().getAddress().getAddress(), orderEvent.getCreatedTime(),orderEvent.getOrder().calculatePrice(),items,orderEvent.getOrderStatus()));
		}
		
		return retVal;
	}
	
	private String getDelivererName(UUID delivererId) {
		if(delivererId != null) {
			return userClient.getDelivererNameAndSurname(delivererId);
		}else {
			return "Not selected";
		}
	}
	
	private Object mapOrderToOrderDTOFromOrderStatus(OrderEvent orderEvent, OrderStatus orderStatus) {
		int tableNumber=1;
		if(orderEvent.getOrder().getOrderType().equals(OrderType.ORDER_INSIDE) && orderEvent.getOrder().getTableId() != null) {
			tableNumber = objectClient.getTableNumberByTableIdForResturant(orderEvent.getOrder().getObjectId(), orderEvent.getOrder().getTableId());
		}
		
		switch (orderStatus) {
	        case UNCONFIRMED: 
	             return new UnConfirmedOrderDTO(orderEvent.getOrder().getId(),new TableResponseDTO(orderEvent.getOrder().getTableId(),tableNumber),orderEvent.getOrder().getOrderType().toString(),orderEvent.getOrder().calculatePrice(),orderEvent.getCreatedTime());
	        case CONFIRMED:
	    		return new ConfirmedOrderDTO(orderEvent.getOrder().getId(),new TableResponseDTO(orderEvent.getOrder().getTableId(), tableNumber),orderEvent.getOrder().getOrderType().toString(),orderEvent.getOrder().calculatePrice(),orderEvent.getCreatedTime(),calculateEstimatedDate(orderEvent.getCreatedTime(), orderEvent.getEstimatedTime()));
	        case READY: 
	        	return new ReadyOrderDTO(orderEvent.getOrder().getId(),new TableResponseDTO(orderEvent.getOrder().getTableId(),tableNumber),orderEvent.getOrder().getOrderType().toString(),orderEvent.getOrder().calculatePrice(),orderEvent.getCreatedTime(),calculateEstimatedDate(orderEvent.getCreatedTime(), orderEvent.getEstimatedTime()), getDelivererName(orderEvent.getDelivererId()));
	        case DELIVERING:
	    		return new OnRouteOrderDTO(orderEvent.getOrder().getId(),orderEvent.getOrder().getOrderType().toString(),orderEvent.getOrder().calculatePrice(),orderEvent.getCreatedTime(),calculateEstimatedDate(orderEvent.getCreatedTime(), orderEvent.getEstimatedTime()), getDelivererName(orderEvent.getDelivererId()));
	        case COMPLETED:
	    		return new CompletedOrderDTO(orderEvent.getOrder().getId(),new TableResponseDTO(orderEvent.getOrder().getTableId(),tableNumber),orderEvent.getOrder().getOrderType().toString(),orderEvent.getOrder().calculatePrice(),orderEvent.getCreatedTime(), getDelivererName(orderEvent.getDelivererId()));

	        default: return null;
		}
	}
	
	private int calculateOrderOrdinalNumberFromObject(UUID objectId) {
		int ordinalNumber = 1;
		try {
			ordinalNumber = orderEventRepository.getMaxOrdinalNumberForObject(objectId);
		}catch(AopInvocationException e) {
			return ordinalNumber;
		}
		return ++ordinalNumber;
	}
	
	private Date getDateAfterGetOrders() {
		Long setTime = (long) (3*60*3600*1000);
		Date newDate = new Date();
		newDate.setTime(newDate.getTime() - setTime);
		
		return newDate;
	}
	
	private Date calculateEstimatedDate(Date createdDate, int estimatedTime) {
		Date estimatedDate = new Date();
				
		estimatedDate.setTime(createdDate.getTime() + (estimatedTime*60*1000));
		
		return estimatedDate;
	}

	private boolean checkIfOrderIsGivenStatus(List<OrderEvent> orderEvent, OrderStatus orderStatus) {
		Collections.sort(orderEvent, new Comparator<OrderEvent>() {
			  public int compare(OrderEvent o1, OrderEvent o2) {
			      return o2.getCreatedTime().compareTo(o1.getCreatedTime());
			  }});
		
		if(orderEvent.size()>0) {
			if(orderEvent.get(0).getOrderStatus()==orderStatus)
				return true;
		}
		
		return false;
	}
	
	private String getOrderStatusByOrderId(UUID orderId) {
		List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);

		Collections.sort(orderEvent, new Comparator<OrderEvent>() {
			  public int compare(OrderEvent o1, OrderEvent o2) {
			      return o2.getCreatedTime().compareTo(o1.getCreatedTime());
			  }});
		
		if(orderEvent.size()>0) {
			return orderEvent.get(0).getOrderStatus().toString();
		}
		
		return "";
	}
}