package no_waiter.order_service.services.contracts;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import com.itextpdf.text.DocumentException;
import javassist.NotFoundException;
import no_waiter.order_service.services.contracts.dto.AcceptOrderDTO;
import no_waiter.order_service.services.contracts.dto.CompletedOrderDTO;
import no_waiter.order_service.services.contracts.dto.ConfirmedOrderDTO;
import no_waiter.order_service.services.contracts.dto.DelivererOrderDTO;
import no_waiter.order_service.services.contracts.dto.OnRouteOrderDTO;
import no_waiter.order_service.services.contracts.dto.OrderCustomerRequestDTO;
import no_waiter.order_service.services.contracts.dto.OrderDetailsDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;
import no_waiter.order_service.services.contracts.dto.ReadyOrderDTO;
import no_waiter.order_service.services.contracts.dto.UnConfirmedOrderDTO;

public interface OrderService {

	UUID createOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId);
	
	UUID createOrderCustomer(OrderCustomerRequestDTO requestDTO, ProductValidationResponseDTO products, UUID customerId);

	List<UnConfirmedOrderDTO> getUnconfirmedOrdersForObject(UUID objectId);

	void rejectOrder(UUID orderId, UUID objectId);

	void acceptOrder(AcceptOrderDTO acceptOrderDTO);

	void acceptOrderDeliverer(AcceptOrderDTO acceptOrderDTO, UUID delivererId);
	
	void pickupOrderDeliverer(UUID orderId, UUID delivererId) throws NotFoundException;
	
	void cancelOrderDeliverer(UUID orderId, UUID delivererId) throws NotFoundException;
	
	void dismissOrderDeliverer(UUID orderId, UUID delivererId) throws NotFoundException;
	
	List<ConfirmedOrderDTO> getConfirmedOrdersForObject(UUID objectId);
	
	List<DelivererOrderDTO> getAllConfirmedOrders();
	
	List<DelivererOrderDTO> getAllAcceptedOrders(UUID delivererId);

	List<DelivererOrderDTO> getAllPickedUpOrders(UUID delivererId);
	
	void setOrderToReady(UUID orderId);

	List<ReadyOrderDTO> getReadyOrdersForObject(UUID objectId);

	void setOnRouteOrder(UUID orderId);

	List<OnRouteOrderDTO> getOnRouteOrdersForObject(UUID objectId);

	void setOrderToComplete(UUID orderId);

	List<CompletedOrderDTO> getCompletedOrdersForObject(UUID objectId);

	OrderDetailsDTO getOrderDetails(UUID orderId);

	void updateOrder(OrderDetailsDTO orderDetailsDTO);

	UUID createOrderForInfoPult(OrderRequestDTO requestDTO, ProductValidationResponseDTO resp, UUID objectId) throws IOException, Exception;

	byte[] generateReportPDF(String orderId) throws DocumentException, Exception;
}
