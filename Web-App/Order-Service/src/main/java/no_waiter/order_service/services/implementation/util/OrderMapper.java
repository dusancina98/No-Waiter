package no_waiter.order_service.services.implementation.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import no_waiter.order_service.entities.Address;
import no_waiter.order_service.entities.Order;
import no_waiter.order_service.entities.OrderEvent;
import no_waiter.order_service.entities.OrderItem;
import no_waiter.order_service.entities.Product;
import no_waiter.order_service.entities.SideDish;
import no_waiter.order_service.services.contracts.dto.CustomerOrderItemDTO;
import no_waiter.order_service.services.contracts.dto.DelivererOrderDTO;
import no_waiter.order_service.services.contracts.dto.NameDTO;
import no_waiter.order_service.services.contracts.dto.ObjectDetailsDTO;
import no_waiter.order_service.services.contracts.dto.OrderItemDTO;
import no_waiter.order_service.services.contracts.dto.OrderItemResponseDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;
import no_waiter.order_service.services.contracts.dto.SideDishDTO;
import no_waiter.order_service.services.contracts.dto.SideDishResponseDTO;

public class OrderMapper {

	public static Order MapOrderRequestDTOToOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId, UUID customerId) {
		Order order = new Order(objectId, requestDTO.OrderType, requestDTO.TableId, new Address(requestDTO.Address), requestDTO.EstimatedTime, customerId);
		List<OrderItem> items = new ArrayList<OrderItem>();
		
		for(ProductValidationDTO product : products.Products) {
			for(OrderItemDTO item : requestDTO.Items) {
				if (item.Id.equals(product.Id)) {
					items.add(new OrderItem(new Product(product.Id, product.Name, product.ImagePath), item.Note, item.Count, product.Price, MapSideDishesDTOToSideDishes(product.SideDishes)));
				}
			}
		}
				
		order.setItems(items);
		return order;
	}
	
	public static List<SideDish> MapSideDishesDTOToSideDishes(List<SideDishDTO> sideDishes) {
		List<SideDish> retVal = new ArrayList<SideDish>();
		
		sideDishes.forEach((sideDish) -> retVal.add(new SideDish(sideDish.Id, sideDish.Name)));
		return retVal;
	}
	
	public static List<OrderItemResponseDTO> MapOrderItemsToOrderItemsResponseDTO(List<OrderItem> items) {
		List<OrderItemResponseDTO> orderItemsResponseDTO = new ArrayList<OrderItemResponseDTO>();
		
		for(OrderItem item : items) {
			orderItemsResponseDTO.add(new OrderItemResponseDTO(item.getId(),item.getProduct().getName(),item.getCount(),item.getProduct().getId(),item.getSingleItemPrice(), item.getProduct().getImagePath(), mapSideDishToSideDishDTO(item.getSideDishes()), item.getNote()));
		}
		
		return orderItemsResponseDTO;
	}
	
	private static List<SideDishResponseDTO> mapSideDishToSideDishDTO(List<SideDish> sideDishes) {
		List<SideDishResponseDTO> retVal = new ArrayList<SideDishResponseDTO>();
		
		for(SideDish sideDish : sideDishes) {
			retVal.add(new SideDishResponseDTO(sideDish.getId(),new NameDTO(sideDish.getName())));
		}
		
		return retVal;
	}
	
	public static OrderItemDTO MapOrderItemResponseDTOToOrderItemDTO(OrderItemResponseDTO orderItemDTO) {
		List<UUID> sideDishes = new ArrayList<UUID>();
		
		for(SideDishResponseDTO sideDish : orderItemDTO.SideDishes) {
			sideDishes.add(sideDish.Id);
		}
		
		return new OrderItemDTO(orderItemDTO.ProductId,orderItemDTO.Count,sideDishes,orderItemDTO.Note);
	}
	
	public static List<CustomerOrderItemDTO> MapOrderToCustomerOrderItemDTO(Order order) {
		List<CustomerOrderItemDTO> retVal = new ArrayList<CustomerOrderItemDTO>();

		for(OrderItem orderItem : order.getItems()) {
			retVal.add(new CustomerOrderItemDTO(orderItem.getProduct().getImagePath(), orderItem.getCount(), orderItem.getNote(), 						mapSideDishesToString(orderItem.getSideDishes()), orderItem.getProduct().getName(), order.calculatePrice()));
		}
		
		return retVal;
	}
	
	private static String mapSideDishesToString(List<SideDish> sideDishes) {
		String retVal = "";
		
		int index=0;
		for(SideDish sideDish : sideDishes) {
			retVal += sideDish.getName();
			
			if(++index != sideDishes.size()) 
				retVal +=",";
		}
		
		return retVal;
	}
	
	public static DelivererOrderDTO MapOrderToDelivererOrderDTO(OrderEvent orderEvent, List<ObjectDetailsDTO> objectDetails) {
		DelivererOrderDTO retVal = new DelivererOrderDTO(orderEvent.getOrder().calculatePrice(), calculateEstimatedDate(orderEvent.getCreatedTime(),orderEvent.getEstimatedTime()), orderEvent.getOrder().getId(), orderEvent.getObjectId(), "", "", "", orderEvent.getOrder().getAddress().getAddress());
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
	
	private static Date calculateEstimatedDate(Date createdDate, int estimatedTime) {
		Date estimatedDate = new Date();
		
		estimatedDate.setTime(createdDate.getTime() + (estimatedTime*60*1000));
		
		return estimatedDate;
	}
	
}
