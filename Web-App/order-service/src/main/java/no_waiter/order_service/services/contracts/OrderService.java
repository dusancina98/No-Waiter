package no_waiter.order_service.services.contracts;

import java.util.List;
import java.util.UUID;

import no_waiter.order_service.services.contracts.dto.AcceptOrderDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;
import no_waiter.order_service.services.contracts.dto.UnConfirmedOrderDTO;

public interface OrderService {

	UUID createOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId);

	List<UnConfirmedOrderDTO> getUnconfirmedOrdersForObject(UUID objectId);

	void rejectOrder(UUID orderId, UUID objectId);

	void acceptOrder(AcceptOrderDTO acceptOrderDTO);
}
