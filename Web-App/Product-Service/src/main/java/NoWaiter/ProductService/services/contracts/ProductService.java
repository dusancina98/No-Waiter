package NoWaiter.ProductService.services.contracts;

import java.util.UUID;

import NoWaiter.ProductService.services.contracts.dto.CategoryDTO;
import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;

public interface ProductService {

	UUID createProductCategory(CategoryDTO categoryDTO, UUID objectId);
	
	Iterable<IdentifiableDTO<CategoryDTO>> findAllProductCategories(UUID objectId);

}
