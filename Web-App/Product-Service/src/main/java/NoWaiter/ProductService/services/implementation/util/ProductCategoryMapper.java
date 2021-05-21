package NoWaiter.ProductService.services.implementation.util;

import java.util.UUID;

import NoWaiter.ProductService.entities.ProductCategory;
import NoWaiter.ProductService.services.contracts.dto.CategoryDTO;

public class ProductCategoryMapper {

	public static ProductCategory MapProductCategoryDTOToProductCategory(CategoryDTO categoryDTO, UUID objectId) {
		if(categoryDTO == null) throw new IllegalArgumentException();
		
		return new ProductCategory(objectId, categoryDTO.Name);
	}
}
