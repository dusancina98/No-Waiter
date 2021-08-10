package no_waiter.order_service.services.implementation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.itextpdf.text.DocumentException;

import no_waiter.order_service.entities.Address;
import no_waiter.order_service.entities.Order;
import no_waiter.order_service.entities.OrderEvent;
import no_waiter.order_service.entities.OrderItem;
import no_waiter.order_service.entities.OrderStatus;
import no_waiter.order_service.entities.OrderType;
import no_waiter.order_service.entities.Product;
import no_waiter.order_service.entities.SideDish;
import no_waiter.order_service.intercomm.ObjectClient;
import no_waiter.order_service.intercomm.ProductClient;
import no_waiter.order_service.repository.OrderEventRepository;
import no_waiter.order_service.repository.OrderRepository;
import no_waiter.order_service.services.contracts.OrderService;
import no_waiter.order_service.services.contracts.dto.AcceptOrderDTO;
import no_waiter.order_service.services.contracts.dto.CompletedOrderDTO;
import no_waiter.order_service.services.contracts.dto.ConfirmedOrderDTO;
import no_waiter.order_service.services.contracts.dto.DelivererOrderDTO;
import no_waiter.order_service.services.contracts.dto.NameDTO;
import no_waiter.order_service.services.contracts.dto.ObjectDetailsDTO;
import no_waiter.order_service.services.contracts.dto.OnRouteOrderDTO;
import no_waiter.order_service.services.contracts.dto.OrderDetailsDTO;
import no_waiter.order_service.services.contracts.dto.OrderItemDTO;
import no_waiter.order_service.services.contracts.dto.OrderItemResponseDTO;
import no_waiter.order_service.services.contracts.dto.OrderItemsDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;
import no_waiter.order_service.services.contracts.dto.ReadyOrderDTO;
import no_waiter.order_service.services.contracts.dto.SideDishDTO;
import no_waiter.order_service.services.contracts.dto.SideDishResponseDTO;
import no_waiter.order_service.services.contracts.dto.TableResponseDTO;
import no_waiter.order_service.services.contracts.dto.UnConfirmedOrderDTO;
import no_waiter.order_service.services.implementation.util.OrderMapper;
import no_waiter.order_service.services.implementation.util.OrderReportPDFGenerator;

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
	
	@Override
	public UUID createOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId) {
		Order order = OrderMapper.MapOrderRequestDTOToOrder(requestDTO, products, objectId);
		orderRepository.save(order);
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.UNCONFIRMED, new Date(), order.getEstimatedTime(), objectId, null);
		orderEventRepository.save(newOrderEvent);
		
		return order.getId();
	}
	
	@Override
	public UUID createOrderForInfoPult(OrderRequestDTO requestDTO, ProductValidationResponseDTO resp,
			UUID objectId) throws Exception {
		Order order = OrderMapper.MapOrderRequestDTOToOrder(requestDTO, resp, objectId);
		orderRepository.save(order);
		
		int ordinalNumber=  calculateOrderOrdinalNumberFromObject(objectId);

		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.UNCONFIRMED, new Date(), order.getEstimatedTime(), objectId, null);
		orderEventRepository.save(newOrderEvent);
		
		return order.getId();
	}
	
	private int calculateOrderOrdinalNumberFromObject(UUID objectId) {
		// TODO Auto-generated method stub
		return 1;
	}
	
	
	@Override
	public List<UnConfirmedOrderDTO> getUnconfirmedOrdersForObject(UUID objectId) {
		List<UnConfirmedOrderDTO> unConfirmedOrderDTO = new ArrayList<UnConfirmedOrderDTO>();
		Long setTime = (long) (3*60*3600*1000);
		Date newDate = new Date();
		newDate.setTime(newDate.getTime() - setTime);
		
		List<UUID> getOrderIdsForObjectAfterDate =  orderEventRepository.getOrderIdsForObjectAfterDate(objectId, newDate);
		
		for(UUID orderId : getOrderIdsForObjectAfterDate) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.UNCONFIRMED)) {
				unConfirmedOrderDTO.add(mapOrderToUnConfirmedOrderDTO(orderEvent.get(0),orderEvent.get(0).getCreatedTime()));
			}
		}
		
		return unConfirmedOrderDTO;
	}
	
	@Override
	public List<ConfirmedOrderDTO> getConfirmedOrdersForObject(UUID objectId) {
		List<ConfirmedOrderDTO> confirmedOrderDTO = new ArrayList<ConfirmedOrderDTO>();
		
		Long setTime = (long) (3*60*3600*1000);
		Date newDate = new Date();
		newDate.setTime(newDate.getTime() - setTime);
		
		//povlaci orderEvente za dati restoran gde je vreme manje od 3h unazad
		List<UUID> getOrderIdsForObjectAfterDate =  orderEventRepository.getOrderIdsForObjectAfterDate(objectId, newDate);
		
		for(UUID orderId : getOrderIdsForObjectAfterDate) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.CONFIRMED)) {
				confirmedOrderDTO.add(mapOrderToConfirmedOrderDTO(orderEvent.get(0)));
			}
		}
		
		return confirmedOrderDTO;
	}

	private ConfirmedOrderDTO mapOrderToConfirmedOrderDTO(OrderEvent orderEvent) {
		Date estimatedDate = new Date();
		estimatedDate.setTime(orderEvent.getCreatedTime().getTime() + (orderEvent.getEstimatedTime()*60*1000));
		
		int tableNumber=1;
		if(orderEvent.getOrder().getOrderType().equals(OrderType.ORDER_INSIDE) && orderEvent.getOrder().getTableId() != null) {
			tableNumber = objectClient.getTableNumberByTableIdForResturant(orderEvent.getOrder().getObjectId(), orderEvent.getOrder().getTableId());
		}
		
		ConfirmedOrderDTO dto = new ConfirmedOrderDTO(orderEvent.getOrder().getId(),new TableResponseDTO(orderEvent.getOrder().getTableId(), tableNumber),orderEvent.getOrder().getOrderType().toString(),getPriceForOrder(orderEvent.getOrder()),orderEvent.getCreatedTime(),estimatedDate);
		
		return dto;
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
	
	private OrderEvent getLatestOrderEventFromOrderId(UUID orderId) {
		List<OrderEvent> orderEvents= orderEventRepository.getOrderEventsByOrderId(orderId);
		
		Collections.sort(orderEvents, new Comparator<OrderEvent>() {
			  public int compare(OrderEvent o1, OrderEvent o2) {
			      return o2.getCreatedTime().compareTo(o1.getCreatedTime());
			  }});
	
		if(orderEvents.size()!=0) {
			return orderEvents.get(0);
		}
		
		return null;
	}

	private UnConfirmedOrderDTO mapOrderToUnConfirmedOrderDTO(OrderEvent orderEvent,Date date) {
		Order order = orderEvent.getOrder();
		
		int tableNumber=1;
		if(order.getOrderType().equals(OrderType.ORDER_INSIDE) && order.getTableId() != null) {
			tableNumber = objectClient.getTableNumberByTableIdForResturant(order.getObjectId(), order.getTableId());
		}
		
		UnConfirmedOrderDTO dto = new UnConfirmedOrderDTO(order.getId(),new TableResponseDTO(order.getTableId(),tableNumber),order.getOrderType().toString(),getPriceForOrder(order),date);
		
		return dto;
	}

	private Double getPriceForOrder(Order order) {
		Double price=0.0;
		
		for(OrderItem orderItem: order.getItems()) {
			price+= orderItem.getSingleItemPrice()*orderItem.getCount();
		}
		
		return price;
	}

	@Override
	public void rejectOrder(UUID orderId, UUID objectId) {
		Order order = orderRepository.findById(orderId).get();
		
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.REJECTED, new Date(), order.getEstimatedTime(), objectId, null);
		orderEventRepository.save(newOrderEvent);
	}

	@Override
	public void acceptOrder(AcceptOrderDTO acceptOrderDTO) {
		Order order = orderRepository.findById(acceptOrderDTO.OrderId).get();
		
		order.setEstimatedTime(acceptOrderDTO.EstimatedTime);
		orderRepository.save(order);
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.CONFIRMED, new Date(), acceptOrderDTO.EstimatedTime, order.getObjectId(), null);
		orderEventRepository.save(newOrderEvent);
	}
	

	@Override
	public void acceptOrderDeliverer(AcceptOrderDTO acceptOrderDTO, UUID delivererId) {
		Order order = orderRepository.findById(acceptOrderDTO.OrderId).get();
		
		order.setEstimatedTime(acceptOrderDTO.EstimatedTime);
		orderRepository.save(order);
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.CONFIRMED_DELIVERY, new Date(), acceptOrderDTO.EstimatedTime, order.getObjectId(), delivererId);
		orderEventRepository.save(newOrderEvent);		
	}

	@Override
	public void setOrderToReady(UUID orderId) {
		Order order = orderRepository.findById(orderId).get();
				
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.READY, new Date(), order.getEstimatedTime(), order.getObjectId(), null);
		orderEventRepository.save(newOrderEvent);
	}

	@Override
	public List<ReadyOrderDTO> getReadyOrdersForObject(UUID objectId) {
		List<ReadyOrderDTO> readyOrderDTO = new ArrayList<ReadyOrderDTO>();
		
		Long setTime = (long) (3*60*3600*1000);
		Date newDate = new Date();
		newDate.setTime(newDate.getTime() - setTime);
		
		List<UUID> getOrderIdsForObjectAfterDate =  orderEventRepository.getOrderIdsForObjectAfterDate(objectId, newDate);
		
		for(UUID orderId : getOrderIdsForObjectAfterDate) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.READY)) {
				readyOrderDTO.add(mapOrderToReadyOrderDTO(orderEvent.get(0)));
			}
		}
		
		return readyOrderDTO;
	}

	private ReadyOrderDTO mapOrderToReadyOrderDTO(OrderEvent orderEvent) {
		Date estimatedDate = new Date();
		estimatedDate.setTime(orderEvent.getCreatedTime().getTime() + (orderEvent.getEstimatedTime()*60*1000));		
		
		int tableNumber=1;
		if(orderEvent.getOrder().getOrderType().equals(OrderType.ORDER_INSIDE) && orderEvent.getOrder().getTableId() != null) {
			tableNumber = objectClient.getTableNumberByTableIdForResturant(orderEvent.getOrder().getObjectId(), orderEvent.getOrder().getTableId());
		}
		
		//TODO: dodati Deliverer name kada preuzme za dostavu
		ReadyOrderDTO dto = new ReadyOrderDTO(orderEvent.getOrder().getId(),new TableResponseDTO(orderEvent.getOrder().getTableId(),tableNumber),orderEvent.getOrder().getOrderType().toString(),getPriceForOrder(orderEvent.getOrder()),orderEvent.getCreatedTime(),estimatedDate, "");
		
		return dto;
	}

	@Override
	public void setOnRouteOrder(UUID orderId) {
		Order order = orderRepository.findById(orderId).get();
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.DELIVERING, new Date(), order.getEstimatedTime(), order.getObjectId(), null);
		orderEventRepository.save(newOrderEvent);
	}

	@Override
	public List<OnRouteOrderDTO> getOnRouteOrdersForObject(UUID objectId) {
		List<OnRouteOrderDTO> onRouteOrderDTO = new ArrayList<OnRouteOrderDTO>();
		
		Long setTime = (long) (3*60*3600*1000);
		Date newDate = new Date();
		newDate.setTime(newDate.getTime() - setTime);
		
		//povlaci orderEvente za dati restoran gde je vreme manje od 3h unazad
		List<UUID> getOrderIdsForObjectAfterDate =  orderEventRepository.getOrderIdsForObjectAfterDate(objectId, newDate);
		
		for(UUID orderId : getOrderIdsForObjectAfterDate) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.DELIVERING)) {
				onRouteOrderDTO.add(mapOrderToOnRouteOrderDTO(orderEvent.get(0)));
			}
		}
		
		return onRouteOrderDTO;
	}

	private OnRouteOrderDTO mapOrderToOnRouteOrderDTO(OrderEvent orderEvent) {
		Date estimatedDate = new Date();
		estimatedDate.setTime(orderEvent.getCreatedTime().getTime() + (orderEvent.getEstimatedTime()*60*1000));		
		
		OnRouteOrderDTO dto = new OnRouteOrderDTO(orderEvent.getOrder().getId(),orderEvent.getOrder().getOrderType().toString(),getPriceForOrder(orderEvent.getOrder()),orderEvent.getCreatedTime(),estimatedDate, "Ime i Prezime");
		
		return dto;
	}

	@Override
	public void setOrderToComplete(UUID orderId) {
		Order order = orderRepository.findById(orderId).get();
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.COMPLETED, new Date(), order.getEstimatedTime(), order.getObjectId(), null);
		orderEventRepository.save(newOrderEvent);	
	}

	@Override
	public List<CompletedOrderDTO> getCompletedOrdersForObject(UUID objectId) {
		List<CompletedOrderDTO> completedOrderDTO = new ArrayList<CompletedOrderDTO>();
		
		Long setTime = (long) (3*60*3600*1000);
		Date newDate = new Date();
		newDate.setTime(newDate.getTime() - setTime);
		
		//povlaci orderEvente za dati restoran gde je vreme manje od 3h unazad
		List<UUID> getOrderIdsForObjectAfterDate =  orderEventRepository.getOrderIdsForObjectAfterDate(objectId, newDate);
		
		for(UUID orderId : getOrderIdsForObjectAfterDate) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.COMPLETED)) {
				completedOrderDTO.add(mapOrderToCompletedOrderDTO(orderEvent.get(0)));
			}
		}
		
		return completedOrderDTO;
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

	private CompletedOrderDTO mapOrderToCompletedOrderDTO(OrderEvent orderEvent) {
		int tableNumber=1;
		if(orderEvent.getOrder().getOrderType().equals(OrderType.ORDER_INSIDE) && orderEvent.getOrder().getTableId() != null) {
			tableNumber = objectClient.getTableNumberByTableIdForResturant(orderEvent.getOrder().getObjectId(), orderEvent.getOrder().getTableId());
		}
		
		CompletedOrderDTO dto = new CompletedOrderDTO(orderEvent.getOrder().getId(),new TableResponseDTO(orderEvent.getOrder().getTableId(),tableNumber),orderEvent.getOrder().getOrderType().toString(),getPriceForOrder(orderEvent.getOrder()),orderEvent.getCreatedTime(), "Ime i Prezime");
		
		return dto;
	}

	@Override
	public OrderDetailsDTO getOrderDetails(UUID orderId) {
		Order order = orderRepository.findById(orderId).get();
		
		Date estimatedDate = new Date();
		estimatedDate.setTime(order.getCreatedTime().getTime() + (order.getEstimatedTime()*60*1000));	
		
		List<OrderItemResponseDTO> orderItems = mapOrderItemsToOrderItemsResponseDTO(order.getItems());

		int tableNumber=1;
		if(order.getOrderType().equals(OrderType.ORDER_INSIDE) && order.getTableId() != null) {
			tableNumber = objectClient.getTableNumberByTableIdForResturant(order.getObjectId(), order.getTableId());
		}

		
		OrderDetailsDTO retVal = new OrderDetailsDTO(order.getId(),order.getCreatedTime(),order.getAddress().getAddress(),estimatedDate,order.getOrderType().toString(),new TableResponseDTO(order.getTableId(),tableNumber),getPriceForOrder(order),orderItems, getOrderStatusByOrderId(order.getId()));
				
		return retVal;
	}

	private List<OrderItemResponseDTO> mapOrderItemsToOrderItemsResponseDTO(List<OrderItem> items) {
		List<OrderItemResponseDTO> orderItemsResponseDTO = new ArrayList<OrderItemResponseDTO>();
		
		for(OrderItem item : items) {
			orderItemsResponseDTO.add(new OrderItemResponseDTO(item.getId(),item.getProduct().getName(),item.getCount(),item.getProduct().getId(),item.getSingleItemPrice(), item.getProduct().getImagePath(), mapSideDishToSideDishDTO(item.getSideDishes()), item.getNote()));
		}
		
		return orderItemsResponseDTO;
	}

	private List<SideDishResponseDTO> mapSideDishToSideDishDTO(List<SideDish> sideDishes) {
		List<SideDishResponseDTO> retVal = new ArrayList<SideDishResponseDTO>();
		
		for(SideDish sideDish : sideDishes) {
			retVal.add(new SideDishResponseDTO(sideDish.getId(),new NameDTO(sideDish.getName())));
		}
		
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
				  newItems.add(mapOrderItemResponseDTOToOrderItemDTO(orderItemDTO));
			  }
		 }
		 
		 System.out.println(newItems.size());
		 
		 ProductValidationResponseDTO resp = productClient.validateOrderItems(new OrderItemsDTO(newItems));
			
		 if(resp.Products.size() == newItems.size()) {
			 for(ProductValidationDTO product : resp.Products) {
					for(OrderItemDTO item : newItems) {
						if (item.Id.equals(product.Id)) {
							order.getItems().add(new OrderItem(new Product(product.Id, product.Name, product.ImagePath), item.Note, item.Count, product.Price, MapSideDishesDTOToSideDishes(product.SideDishes)));
						}
					}
				}
		 } 
		 
		 System.out.println("BROJ ITEMA" + order.getItems().size());
	}
	
	private List<SideDish> MapSideDishesDTOToSideDishes(List<SideDishDTO> sideDishes) {
		List<SideDish> retVal = new ArrayList<SideDish>();
		
		sideDishes.forEach((sideDish) -> retVal.add(new SideDish(sideDish.Id, sideDish.Name)));
		return retVal;
	}

	private OrderItemDTO mapOrderItemResponseDTOToOrderItemDTO(OrderItemResponseDTO orderItemDTO) {
		List<UUID> sideDishes = new ArrayList<UUID>();
		
		for(SideDishResponseDTO sideDish : orderItemDTO.SideDishes) {
			sideDishes.add(sideDish.Id);
		}
		
		return new OrderItemDTO(orderItemDTO.ProductId,orderItemDTO.Count,sideDishes,orderItemDTO.Note);
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
		
		Long setTime = (long) (5*60*3600*1000);
		Date newDate = new Date();
		newDate.setTime(newDate.getTime() - setTime);
		
		List<OrderEvent> confirmedOrderEvents =  orderEventRepository.getConfirmedOrderEventsForDelivery(newDate);
		List<UUID> objectIds = orderEventRepository.getDistinctObjectIdsForDelivery(newDate);
		List<ObjectDetailsDTO> objectDetails = objectClient.getObjectDetailsByObjectIds(objectIds);
		
		confirmedOrderEvents.forEach((orderEvent) -> confirmedOrderDTO.add(mapOrderToDelivererOrderDTO(orderEvent, objectDetails)));
		return confirmedOrderDTO;
	}	
	
	private DelivererOrderDTO mapOrderToDelivererOrderDTO(OrderEvent orderEvent, List<ObjectDetailsDTO> objectDetails) {
		Date estimatedDate = new Date();
		estimatedDate.setTime(orderEvent.getCreatedTime().getTime() + (orderEvent.getEstimatedTime()*60*1000));		
		
		DelivererOrderDTO retVal = new DelivererOrderDTO(getPriceForOrder(orderEvent.getOrder()), estimatedDate, orderEvent.getOrder().getId(), orderEvent.getObjectId(), "", "", "", orderEvent.getOrder().getAddress().getAddress());
		for (ObjectDetailsDTO objectDetailsDTO : objectDetails) {
			if (objectDetailsDTO.ObjectId.equals(orderEvent.getObjectId())) {
				retVal.ObjectImage = objectDetailsDTO.ObjectImage;
				retVal.ObjectName = objectDetailsDTO.ObjectName;
				retVal.ObjectAddress = objectDetailsDTO.ObjectAddress;
				break;
			}
		}
		return retVal;
	}

	@Override
	public List<DelivererOrderDTO> getAllAcceptedOrders(UUID delivererId) {
		List<DelivererOrderDTO> acceptedOrderDTO = new ArrayList<DelivererOrderDTO>();
		
		List<OrderEvent> confirmedOrderEvents =  orderEventRepository.getAcceptedOrderEventsForDeliveryByDeliverer(delivererId);
		List<UUID> objectIds = orderEventRepository.getDistinctObjectIdsForAcceptedDelivery(delivererId);
		List<ObjectDetailsDTO> objectDetails = objectClient.getObjectDetailsByObjectIds(objectIds);

		confirmedOrderEvents.forEach((orderEvent) -> acceptedOrderDTO.add(mapOrderToDelivererOrderDTO(orderEvent, objectDetails)));
		return acceptedOrderDTO;
	}

	@Override
	public byte[] generateReportPDF(String orderId) throws DocumentException, Exception {
		Order order = orderRepository.findById(UUID.fromString(orderId)).get();
		
		OrderReportPDFGenerator pdfGenerator = new OrderReportPDFGenerator(order);

		return pdfGenerator.generatePDF();
	}


}
