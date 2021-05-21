package NoWaiter.ProductService.services.implementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NoWaiter.ProductService.entities.ProductCategory;
import NoWaiter.ProductService.repository.ProductCategoryRepository;
import NoWaiter.ProductService.services.contracts.ProductService;
import NoWaiter.ProductService.services.contracts.dto.CategoryDTO;
import NoWaiter.ProductService.services.implementation.util.ProductCategoryMapper;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@Override
	public UUID createProductCategory(CategoryDTO categoryDTO, UUID objectId) {
		
		ProductCategory productCategory = ProductCategoryMapper.MapProductCategoryDTOToProductCategory(categoryDTO, objectId);
		productCategoryRepository.save(productCategory);
		return productCategory.getId();
	}

}
