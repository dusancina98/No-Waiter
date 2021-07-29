package no_waiter.order_service.services.implementation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no_waiter.order_service.entities.Order;
import no_waiter.order_service.entities.OrderEvent;
import no_waiter.order_service.entities.OrderItem;
import no_waiter.order_service.entities.OrderStatus;
import no_waiter.order_service.intercomm.ProductClient;
import no_waiter.order_service.repository.OrderEventRepository;
import no_waiter.order_service.repository.OrderRepository;
import no_waiter.order_service.services.contracts.OrderService;
import no_waiter.order_service.services.contracts.dto.AcceptOrderDTO;
import no_waiter.order_service.services.contracts.dto.CompletedOrderDTO;
import no_waiter.order_service.services.contracts.dto.ConfirmedOrderDTO;
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
import no_waiter.order_service.services.contracts.dto.UnConfirmedOrderDTO;
import no_waiter.order_service.services.implementation.util.OrderMapper;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderEventRepository orderEventRepository;
	
	@Autowired
	private ProductClient productClient;
	
	@Override
	public UUID createOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId) {
		Order order = OrderMapper.MapOrderRequestDTOToOrder(requestDTO, products, objectId);
		orderRepository.save(order);
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.UNCONFIRMED, new Date(), order.getEstimatedTime(), objectId);
		orderEventRepository.save(newOrderEvent);
		
		return order.getId();
	}

	@Override
	public List<UnConfirmedOrderDTO> getUnconfirmedOrdersForObject(UUID objectId) {
		List<UnConfirmedOrderDTO> unConfirmedOrderDTO = new ArrayList<UnConfirmedOrderDTO>();
		Long setTime = (long) (3*60*3600*1000);
		Date newDate = new Date();
		newDate.setTime(newDate.getTime() - setTime);
		//povlaci orderEvente za dati restoran gde je vreme manje od 3h unazad
		List<UUID> getOrderIdsForObjectAfterDate =  orderEventRepository.getOrderIdsForObjectAfterDate(objectId, newDate);
		
		for(UUID orderId : getOrderIdsForObjectAfterDate) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(checkIfOrderIsGivenStatus(orderEvent,OrderStatus.UNCONFIRMED)) {
				unConfirmedOrderDTO.add(mapOrderToUnConfirmedOrderDTO(orderId,orderEvent.get(0).getCreatedTime()));
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
		
		ConfirmedOrderDTO dto = new ConfirmedOrderDTO(orderEvent.getOrder().getId(),"1",orderEvent.getOrder().getOrderType().toString(),getPriceForOrder(orderEvent.getOrder()),orderEvent.getCreatedTime(),estimatedDate);
		
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

	private UnConfirmedOrderDTO mapOrderToUnConfirmedOrderDTO(UUID orderId,Date date) {
		Optional<Order> order = orderRepository.findById(orderId);

		UnConfirmedOrderDTO dto = new UnConfirmedOrderDTO(order.get().getId(),"1",order.get().getOrderType().toString(),getPriceForOrder(order.get()),date);
		
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
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.REJECTED, new Date(), order.getEstimatedTime(), objectId);
		orderEventRepository.save(newOrderEvent);
	}

	@Override
	public void acceptOrder(AcceptOrderDTO acceptOrderDTO) {
		Order order = orderRepository.findById(acceptOrderDTO.OrderId).get();
		
		order.setEstimatedTime(acceptOrderDTO.EstimatedTime);
		orderRepository.save(order);
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.CONFIRMED, new Date(), acceptOrderDTO.EstimatedTime, order.getObjectId());
		orderEventRepository.save(newOrderEvent);
	}

	@Override
	public void setOrderToReady(UUID orderId) {
		Order order = orderRepository.findById(orderId).get();
				
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.READY, new Date(), order.getEstimatedTime(), order.getObjectId());
		orderEventRepository.save(newOrderEvent);
	}

	@Override
	public List<ReadyOrderDTO> getReadyOrdersForObject(UUID objectId) {
		List<ReadyOrderDTO> readyOrderDTO = new ArrayList<ReadyOrderDTO>();
		
		Long setTime = (long) (3*60*3600*1000);
		Date newDate = new Date();
		newDate.setTime(newDate.getTime() - setTime);
		
		//povlaci orderEvente za dati restoran gde je vreme manje od 3h unazad
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
		
		ReadyOrderDTO dto = new ReadyOrderDTO(orderEvent.getOrder().getId(),"1",orderEvent.getOrder().getOrderType().toString(),getPriceForOrder(orderEvent.getOrder()),orderEvent.getCreatedTime(),estimatedDate, "Ime i Prezime");
		
		return dto;
	}

	@Override
	public void setOnRouteOrder(UUID orderId) {
		Order order = orderRepository.findById(orderId).get();
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.DELIVERING, new Date(), order.getEstimatedTime(), order.getObjectId());
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
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.COMPLETED, new Date(), order.getEstimatedTime(), order.getObjectId());
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

	private CompletedOrderDTO mapOrderToCompletedOrderDTO(OrderEvent orderEvent) {
		CompletedOrderDTO dto = new CompletedOrderDTO(orderEvent.getOrder().getId(),"1",orderEvent.getOrder().getOrderType().toString(),getPriceForOrder(orderEvent.getOrder()),orderEvent.getCreatedTime(), "Ime i Prezime");
		
		return dto;
	}

	@Override
	public OrderDetailsDTO getOrderDetails(UUID orderId) {
		Order order = orderRepository.findById(orderId).get();
		
		Date estimatedDate = new Date();
		estimatedDate.setTime(order.getCreatedTime().getTime() + (order.getEstimatedTime()*60*1000));	
		
		List<OrderItemResponseDTO> orderItems = mapOrderItemsToOrderItemsResponseDTO(order.getItems());
		
		OrderDetailsDTO retVal = new OrderDetailsDTO(order.getId(),order.getCreatedTime(),order.getAddress().getAddress(),estimatedDate,order.getOrderType().toString(),order.getTableId().toString(),getPriceForOrder(order),orderItems);
				
		return retVal;
	}

	private List<OrderItemResponseDTO> mapOrderItemsToOrderItemsResponseDTO(List<OrderItem> items) {
		List<OrderItemResponseDTO> orderItemsResponseDTO = new ArrayList<OrderItemResponseDTO>();
		return orderItemsResponseDTO;
	}
}
