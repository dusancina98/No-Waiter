package no_waiter.order_service.services.contracts;

import java.util.List;
import java.util.UUID;

import no_waiter.order_service.services.contracts.dto.AcceptOrderDTO;
import no_waiter.order_service.services.contracts.dto.CompletedOrderDTO;
import no_waiter.order_service.services.contracts.dto.ConfirmedOrderDTO;
import no_waiter.order_service.services.contracts.dto.DelivererOrdeDTO;
import no_waiter.order_service.services.contracts.dto.OnRouteOrderDTO;
import no_waiter.order_service.services.contracts.dto.OrderDetailsDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;
import no_waiter.order_service.services.contracts.dto.ReadyOrderDTO;
import no_waiter.order_service.services.contracts.dto.UnConfirmedOrderDTO;

public interface OrderService {

	UUID createOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId);

	List<UnConfirmedOrderDTO> getUnconfirmedOrdersForObject(UUID objectId);

	void rejectOrder(UUID orderId, UUID objectId);

	void acceptOrder(AcceptOrderDTO acceptOrderDTO);

	List<ConfirmedOrderDTO> getConfirmedOrdersForObject(UUID objectId);
	
	List<DelivererOrdeDTO> getAllConfirmedOrders();

	void setOrderToReady(UUID orderId);

	List<ReadyOrderDTO> getReadyOrdersForObject(UUID objectId);

	void setOnRouteOrder(UUID orderId);

	List<OnRouteOrderDTO> getOnRouteOrdersForObject(UUID objectId);

	void setOrderToComplete(UUID orderId);

	List<CompletedOrderDTO> getCompletedOrdersForObject(UUID objectId);

	OrderDetailsDTO getOrderDetails(UUID orderId);

	void updateOrder(OrderDetailsDTO orderDetailsDTO);
}
