package no_waiter.order_service.services.contracts.dto;

import java.util.List;

public class ProductValidationResponseDTO {

	public List<ProductValidationDTO> Products;
	
	public ProductValidationResponseDTO() {}

	public ProductValidationResponseDTO(List<ProductValidationDTO> products) {
		super();
		Products = products;
	}
	
}
