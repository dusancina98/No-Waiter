package NoWaiter.ProductService.services.implementation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import NoWaiter.ProductService.entities.Ingredient;
import NoWaiter.ProductService.entities.Product;
import NoWaiter.ProductService.entities.ProductCategory;
import NoWaiter.ProductService.entities.ProductType;
import NoWaiter.ProductService.entities.SideDish;
import NoWaiter.ProductService.repository.ProductCategoryRepository;
import NoWaiter.ProductService.repository.ProductRepository;
import NoWaiter.ProductService.repository.ProductTypeRepository;
import NoWaiter.ProductService.services.contracts.ProductService;
import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ProductService.services.contracts.dto.NameDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductRequestDTO;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidProductCategoryException;
import NoWaiter.ProductService.services.implementation.util.ImageUtil;
import NoWaiter.ProductService.services.implementation.util.ProductCategoryMapper;
import NoWaiter.ProductService.services.implementation.util.ProductMapper;
import NoWaiter.ProductService.services.implementation.util.ProductTypeMapper;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@Autowired
	private ProductTypeRepository productTypeRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private Environment env;
	
	@Override
	public UUID createProductCategory(NameDTO categoryDTO, UUID objectId) {
		
		ProductCategory productCategory = ProductCategoryMapper.MapProductCategoryDTOToProductCategory(categoryDTO, objectId);
		productCategoryRepository.save(productCategory);
		return productCategory.getId();
	}

	@Override
	public Iterable<IdentifiableDTO<NameDTO>> findAllProductCategories(UUID objectId) {
		return ProductCategoryMapper.MapProductCategoryCollectionToIdentifiableCategoryDTOCollection(productCategoryRepository.findAllByObjectId(objectId));
	}

	@Override
	public Iterable<IdentifiableDTO<NameDTO>> findAllProductTypes() {
		return ProductTypeMapper.MapProductTypeCollectionToIdentifiableTypeDTOCollection(productTypeRepository.findAll());
	}

	@Override
	@Transactional
	public UUID createProduct(ProductRequestDTO productDTO, UUID objectId) throws InvalidProductCategoryException, IOException {

		ProductCategory productCategory = productCategoryRepository.findById(productDTO.CategoryId).get();
		
		if(!objectId.equals(productCategory.getObjectId())) throw new InvalidProductCategoryException("Invalid product category id");
		
		Product product = mapProductRequestDTOToProduct(productDTO);
		product.setProductCategory(productCategory);
		if(productDTO.Image == null)
			product.setImagePath("");
		else
			product.setImagePath(env.getProperty("rel-image-path") + "\\" + product.getId().toString() + ".jpg");
		productRepository.save(product);
		saveImageAndGetPath(productDTO.Image, product.getId());

		return product.getId();
	}

	private String saveImageAndGetPath(MultipartFile multipartFile, UUID productId) throws IOException {
		
		if(multipartFile != null) 
			ImageUtil.saveFile(env.getProperty("abs-image-path"), productId.toString() + ".jpg", multipartFile);
		return env.getProperty("rel-image-path") + "\\" + productId.toString() + ".jpg";
	}
		
	private Product mapProductRequestDTOToProduct(ProductRequestDTO productDTO) {
		if(productDTO == null) throw new IllegalArgumentException();
		
		List<Ingredient> ingredients = new ArrayList<Ingredient>();
		List<SideDish> sideDishes = new ArrayList<SideDish>();
		ProductType productType = productTypeRepository.findById(productDTO.ProductTypeId).get();

		productDTO.Ingredients.forEach((ingredient) -> ingredients.add(new Ingredient(ingredient)));
		productDTO.SideDishes.forEach((sideDish) -> sideDishes.add(new SideDish(sideDish)));
		System.out.println(ingredients.size() + "\n\n\n");
		return new Product(productDTO.Name, productDTO.Description, true, "", productDTO.Price, productDTO.Amount, productDTO.MeasureUnit, productType, ingredients, sideDishes);
	}

	@Override
	public Iterable<IdentifiableDTO<ProductDTO>> findAllProducts(UUID objectId) {
		return ProductMapper.MapProductCategoryCollectionToIdentifiableProductDTOCollection(productCategoryRepository.findAllByObjectId(objectId));
	}
}
