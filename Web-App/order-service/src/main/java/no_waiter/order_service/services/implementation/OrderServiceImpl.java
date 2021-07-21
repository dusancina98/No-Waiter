package no_waiter.order_service.services.implementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no_waiter.order_service.entities.Order;
import no_waiter.order_service.repository.OrderRepository;
import no_waiter.order_service.services.contracts.OrderService;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;
import no_waiter.order_service.services.implementation.util.OrderMapper;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepository orderRepository;
	
	@Override
	public UUID createOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId) {
		Order order = OrderMapper.MapOrderRequestDTOToOrder(requestDTO, products, objectId);
		orderRepository.save(order);
		return order.getId();
	}

}
