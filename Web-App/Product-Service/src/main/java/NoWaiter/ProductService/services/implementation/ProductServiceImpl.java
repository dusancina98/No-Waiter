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
import NoWaiter.ProductService.entities.ProductAmount;
import NoWaiter.ProductService.entities.ProductCategory;
import NoWaiter.ProductService.entities.ProductType;
import NoWaiter.ProductService.entities.SideDish;
import NoWaiter.ProductService.repository.ProductCategoryRepository;
import NoWaiter.ProductService.repository.ProductRepository;
import NoWaiter.ProductService.repository.ProductTypeRepository;
import NoWaiter.ProductService.services.contracts.ProductService;
import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ProductService.services.contracts.dto.NameDTO;
import NoWaiter.ProductService.services.contracts.dto.OrderItemDTO;
import NoWaiter.ProductService.services.contracts.dto.OrderItemsDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductCustomerDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductRequestDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductUpdateRequestDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductValidationDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductValidationResponseDTO;
import NoWaiter.ProductService.services.contracts.dto.SideDishDTO;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidOrderItemException;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidProductCategoryException;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidProductCategoryNameException;
import NoWaiter.ProductService.services.contracts.exceptions.UnauthorizedRequestException;
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
	public UUID createProductCategory(NameDTO categoryDTO, UUID objectId) throws InvalidProductCategoryNameException {
		List<ProductCategory> existWithNameProductCategory = productCategoryRepository.findWithCategoryNameAndObject(categoryDTO.Name.toLowerCase(), objectId);
		
		if(existWithNameProductCategory.size()!=0) {
			throw new InvalidProductCategoryNameException("Category with this name already exist");
		}
		
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
			product.setImagePath(env.getProperty("abs-image-path") + "//" + product.getId().toString() + ".jpg");
		
		productRepository.save(product);
		saveImageAndGetPath(productDTO.Image, product.getId());

		return product.getId();
	}

	private String saveImageAndGetPath(MultipartFile multipartFile, UUID productId) throws IOException {
		
		if(multipartFile != null) 
			ImageUtil.saveFile(env.getProperty("rel-image-path"), productId.toString() + ".jpg", multipartFile);
		return env.getProperty("abs-image-path") + "//" + productId.toString() + ".jpg";
	}
		
	private Product mapProductRequestDTOToProduct(ProductRequestDTO productDTO) {
		if(productDTO == null) throw new IllegalArgumentException();
		
		List<Ingredient> ingredients = new ArrayList<Ingredient>();
		List<SideDish> sideDishes = new ArrayList<SideDish>();
		ProductType productType = productTypeRepository.findById(productDTO.ProductTypeId).get();

		productDTO.Ingredients.forEach((ingredient) -> ingredients.add(new Ingredient(ingredient)));
		productDTO.SideDishes.forEach((sideDish) -> sideDishes.add(new SideDish(sideDish)));

		return new Product(productDTO.Name, productDTO.Description, true, "", productDTO.Price, productDTO.Amount, productDTO.MeasureUnit, productType, ingredients, sideDishes);
	}

	@Override
	public Iterable<IdentifiableDTO<ProductDTO>> findAllProducts(UUID objectId) {
		return ProductMapper.MapProductCategoryCollectionToIdentifiableProductDTOCollection(productCategoryRepository.findAllByObjectId(objectId));
	}

	@Override
	public void updateImage(MultipartFile multipartFile, UUID productId, UUID objectId) throws IOException, UnauthorizedRequestException {

		Product product = productRepository.findById(productId).get();
		
		if(!objectId.equals(product.getProductCategory().getObjectId())) throw new UnauthorizedRequestException("Object admin not authorized for this operation");
		
		product.setImagePath(saveImageAndGetPath(multipartFile, productId));
		productRepository.save(product);
	}

	@Override
	public void updateProduct(IdentifiableDTO<ProductUpdateRequestDTO> productDTO, UUID objectId) throws UnauthorizedRequestException {
		
		Product product = productRepository.findById(productDTO.Id).get();
		
		if(!objectId.equals(product.getProductCategory().getObjectId())) throw new UnauthorizedRequestException("Object admin not authorized for this operation");
		
		product.setName(productDTO.EntityDTO.Name);
		
		List<Ingredient> ingredients = new ArrayList<Ingredient>();
		List<SideDish> sideDishes = new ArrayList<SideDish>();
		ProductType productType = productTypeRepository.findById(productDTO.EntityDTO.ProductTypeId).get();

		productDTO.EntityDTO.Ingredients.forEach((ingredient) -> ingredients.add(new Ingredient(ingredient)));
		productDTO.EntityDTO.SideDishes.forEach((sideDish) -> sideDishes.add(new SideDish(sideDish)));
		product.setIngredients(ingredients);
		product.setSideDishes(sideDishes);
		product.setPrice(productDTO.EntityDTO.Price);
		product.setProductAmount(new ProductAmount(productDTO.EntityDTO.Amount, productDTO.EntityDTO.MeasureUnit));
		product.setProductType(productType);
		product.setDescription(productDTO.EntityDTO.Description);
		product.validate();
		productRepository.save(product);
	}

	@Override
	public ProductValidationResponseDTO validateOrderItems(OrderItemsDTO items) throws InvalidOrderItemException {
		List<ProductValidationDTO> products = new ArrayList<ProductValidationDTO>();
		
		for (OrderItemDTO item : items.Items) {
			Product product = productRepository.findById(item.Id).get();
			List<SideDishDTO> sideDishes = new ArrayList<SideDishDTO>();

			for (UUID sideDishId : item.SideDishes) {
				boolean found = false;
				for (SideDish sideDish : product.getSideDishes()) {
					if (sideDish.getId().equals(sideDishId)) {
						found = true;
						sideDishes.add(new SideDishDTO(sideDish.getId(), sideDish.getName()));
						break;
					}
				}
				if(!found) {
					throw new InvalidOrderItemException();
				} 
			}
			products.add(new ProductValidationDTO(product.getId(), product.getName(), product.getImagePath(), product.getPrice(), sideDishes));

		}
		
		return new ProductValidationResponseDTO(products);
	}

	@Override
	public void deleteProduct(UUID productId) {
		Product product = productRepository.findById(productId).get();
		
		product.delete();
		
		productRepository.save(product);
	}

	@Override
	public void deleteCategory(UUID categoryId) {
		// TODO Auto-generated method stub
		ProductCategory productCategory = productCategoryRepository.findById(categoryId).get();
		
		productCategory.delete();
		
		productCategoryRepository.save(productCategory);
	}

	@Override
	public Iterable<IdentifiableDTO<ProductCustomerDTO>> findAllProductsForCustomer(UUID objectId) {
		return ProductMapper.MapProductCategoryCollectionToProductCustomerDTOCollection(productCategoryRepository.findAllByObjectId(objectId));
	}
}
