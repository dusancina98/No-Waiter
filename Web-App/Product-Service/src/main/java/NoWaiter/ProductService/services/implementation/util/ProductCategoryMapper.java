package NoWaiter.ProductService.services.implementation.util;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import NoWaiter.ProductService.entities.ProductCategory;
import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ProductService.services.contracts.dto.NameDTO;

public class ProductCategoryMapper {

	public static ProductCategory MapProductCategoryDTOToProductCategory(NameDTO categoryDTO, UUID objectId) {
		if(categoryDTO == null) throw new IllegalArgumentException();
		
		return new ProductCategory(objectId, categoryDTO.Name);
	}
	
	public static IdentifiableDTO<NameDTO> MapProductCategoryToIdentifiableCategoryDTO(ProductCategory productCategory) {
		if(productCategory == null) throw new IllegalArgumentException();
		
		return new IdentifiableDTO<NameDTO>(productCategory.getId(), new NameDTO(productCategory.getName()));
	}
	
	public static Iterable<IdentifiableDTO<NameDTO>> MapProductCategoryCollectionToIdentifiableCategoryDTOCollection(Iterable<ProductCategory> productCategories){
		if (productCategories == null) throw new IllegalArgumentException();

		List<IdentifiableDTO<NameDTO>> retVal = new ArrayList<>();
		productCategories.forEach((category) -> retVal.add(MapProductCategoryToIdentifiableCategoryDTO(category)));

		return retVal;
	}
	
}
