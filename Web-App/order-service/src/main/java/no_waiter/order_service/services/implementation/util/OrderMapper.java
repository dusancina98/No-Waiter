package no_waiter.order_service.services.implementation.util;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import no_waiter.order_service.entities.Address;
import no_waiter.order_service.entities.Order;
import no_waiter.order_service.entities.OrderItem;
import no_waiter.order_service.entities.Product;
import no_waiter.order_service.entities.SideDish;
import no_waiter.order_service.services.contracts.dto.OrderItemDTO;
import no_waiter.order_service.services.contracts.dto.OrderRequestDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationDTO;
import no_waiter.order_service.services.contracts.dto.ProductValidationResponseDTO;
import no_waiter.order_service.services.contracts.dto.SideDishDTO;

public class OrderMapper {

	public static Order MapOrderRequestDTOToOrder(OrderRequestDTO requestDTO, ProductValidationResponseDTO products, UUID objectId) {
		Order order = new Order(objectId, requestDTO.OrderType, requestDTO.TableId, new Address(requestDTO.Address), requestDTO.EstimatedTime);
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
	
}
