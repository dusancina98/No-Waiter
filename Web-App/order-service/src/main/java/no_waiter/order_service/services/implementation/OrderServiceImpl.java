package no_waiter.order_service.services.implementation;

import java.util.ArrayList;
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
import no_waiter.order_service.repository.OrderEventRepository;
import no_waiter.order_service.repository.OrderRepository;
import no_waiter.order_service.services.contracts.OrderService;
import no_waiter.order_service.services.contracts.dto.AcceptOrderDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;
import no_waiter.order_service.services.contracts.dto.UnConfirmedOrderDTO;
import no_waiter.order_service.services.implementation.util.OrderMapper;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderEventRepository orderEventRepository;
	
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
		//povlaci orderEvente za dati restoran gde je orderstatus unconfirmed 
		List<UUID> getOrderIdsForObjectAfterDate =  orderEventRepository.getOrderIdsForObjectAfterDate(objectId, newDate);
		


		for(UUID orderId : getOrderIdsForObjectAfterDate) {
			List<OrderEvent> orderEvent = orderEventRepository.getOrderEventsByOrderId(orderId);
			if(orderEvent.size()==0) 
				continue;
			
			if(orderEvent.size()==1) {
				unConfirmedOrderDTO.add(mapOrderToUnConfirmedOrderDTO(orderId,orderEvent.get(0).getTimeStamp()));
				continue;
			}
			
			Date orderDate= checkIfOrderIsUnConfirmed(orderEvent);
			if(orderDate != null) {
				unConfirmedOrderDTO.add(mapOrderToUnConfirmedOrderDTO(orderId,orderDate));
			}
		}
		
		return unConfirmedOrderDTO;
	}

	private Date checkIfOrderIsUnConfirmed(List<OrderEvent> orderEvent) {
		// TODO Auto-generated method stub
		return null;
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
		
		OrderEvent newOrderEvent = new OrderEvent(order, OrderStatus.CONFIRMED, new Date(), acceptOrderDTO.EstimatedTime, order.getObjectId());
		orderEventRepository.save(newOrderEvent);
		
	}

}
