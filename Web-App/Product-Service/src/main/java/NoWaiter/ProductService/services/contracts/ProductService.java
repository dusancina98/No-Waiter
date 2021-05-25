package NoWaiter.ProductService.services.contracts;

import java.io.IOException;
import java.util.UUID;

import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ProductService.services.contracts.dto.NameDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductRequestDTO;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidProductCategoryException;

public interface ProductService {

	UUID createProductCategory(NameDTO categoryDTO, UUID objectId);
	
	UUID createProduct(ProductRequestDTO productDTO, UUID objectId) throws InvalidProductCategoryException, IOException;	
	
	Iterable<IdentifiableDTO<ProductDTO>> findAllProducts(UUID objectId);
	
	Iterable<IdentifiableDTO<NameDTO>> findAllProductCategories(UUID objectId);

	Iterable<IdentifiableDTO<NameDTO>> findAllProductTypes();

}
