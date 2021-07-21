package no_waiter.order_service.services.contracts;

import java.util.UUID;

import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;

public interface OrderService {

	UUID createOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId);
}
