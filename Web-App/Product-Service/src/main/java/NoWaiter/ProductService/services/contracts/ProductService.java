package NoWaiter.ProductService.services.contracts;

import java.util.UUID;

import NoWaiter.ProductService.services.contracts.dto.CategoryDTO;

public interface ProductService {

	UUID createProductCategory(CategoryDTO categoryDTO, UUID objectId);
}
