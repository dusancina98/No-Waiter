package NoWaiter.ProductService.services.contracts;

import java.io.IOException;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ProductService.services.contracts.dto.NameDTO;
import NoWaiter.ProductService.services.contracts.dto.OrderItemsDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductCustomerDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductRequestDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductUpdateRequestDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductValidationResponseDTO;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidOrderItemException;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidProductCategoryException;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidProductCategoryNameException;
import NoWaiter.ProductService.services.contracts.exceptions.UnauthorizedRequestException;

public interface ProductService {

	UUID createProductCategory(NameDTO categoryDTO, UUID objectId) throws InvalidProductCategoryNameException;
	
	UUID createProduct(ProductRequestDTO productDTO, UUID objectId) throws InvalidProductCategoryException, IOException;
	
	void updateProduct(IdentifiableDTO<ProductUpdateRequestDTO> productDTO, UUID objectId) throws UnauthorizedRequestException;
	
    void updateImage(MultipartFile multipartFile, UUID productId, UUID objectId) throws IOException, UnauthorizedRequestException;
	
	Iterable<IdentifiableDTO<ProductDTO>> findAllProducts(UUID objectId);
	
	Iterable<IdentifiableDTO<NameDTO>> findAllProductCategories(UUID objectId);

	Iterable<IdentifiableDTO<NameDTO>> findAllProductTypes();
	
	ProductValidationResponseDTO validateOrderItems(OrderItemsDTO items) throws InvalidOrderItemException;

	void deleteProduct(UUID productId);

	void deleteCategory(UUID categoryId);

	Iterable<IdentifiableDTO<ProductCustomerDTO>> findAllProductsForCustomer(UUID objectId);
}
