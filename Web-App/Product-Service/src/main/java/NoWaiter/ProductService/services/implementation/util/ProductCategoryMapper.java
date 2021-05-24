package NoWaiter.ProductService.services.implementation.util;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import NoWaiter.ProductService.entities.ProductCategory;
import NoWaiter.ProductService.services.contracts.dto.CategoryDTO;
import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;

public class ProductCategoryMapper {

	public static ProductCategory MapProductCategoryDTOToProductCategory(CategoryDTO categoryDTO, UUID objectId) {
		if(categoryDTO == null) throw new IllegalArgumentException();
		
		return new ProductCategory(objectId, categoryDTO.Name);
	}
	
	public static IdentifiableDTO<CategoryDTO> MapProductCategoryToIdentifiableCategoryDTO(ProductCategory productCategory) {
		if(productCategory == null) throw new IllegalArgumentException();
		
		return new IdentifiableDTO<CategoryDTO>(productCategory.getId(), new CategoryDTO(productCategory.getName()));
	}
	
	public static Iterable<IdentifiableDTO<CategoryDTO>> MapProductCategoryCollectionToIdentifiableCategoryDTOCollection(Iterable<ProductCategory> productCategories){
		if (productCategories == null) throw new IllegalArgumentException();

		List<IdentifiableDTO<CategoryDTO>> retVal = new ArrayList<>();
		productCategories.forEach((category) -> retVal.add(MapProductCategoryToIdentifiableCategoryDTO(category)));

		return retVal;
	}
}
