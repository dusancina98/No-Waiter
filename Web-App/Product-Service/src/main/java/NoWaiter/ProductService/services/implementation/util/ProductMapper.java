package NoWaiter.ProductService.services.implementation.util;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import NoWaiter.ProductService.entities.Ingredient;
import NoWaiter.ProductService.entities.Product;
import NoWaiter.ProductService.entities.ProductCategory;
import NoWaiter.ProductService.entities.SideDish;
import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ProductService.services.contracts.dto.NameDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductCustomerDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductDTO;
import NoWaiter.ProductService.services.contracts.dto.SideDishCustomerDTO;

public class ProductMapper {

	public static IdentifiableDTO<ProductDTO> MapProductToIdentifiableProductDTO(Product product, ProductCategory productCategory) {
		if(product == null) throw new IllegalArgumentException();
		
		return new IdentifiableDTO<ProductDTO>(product.getId(), new ProductDTO(MapEntityToIdentifiableEntityNameDTO(productCategory.getId(),productCategory.getName()),
								product.getName(), product.getDescription(), product.getPrice(), product.getProductAmount().getMeasureUnit().getMeasureUnitName(), product.getProductAmount().getAmount(),
								MapEntityToIdentifiableEntityNameDTO(product.getProductType().getId(), product.getProductType().getName()),
								MapIngredientListToIdentifiableIngredientDTOList(product.getIngredients()),
								MapSideDishesListToIdentifiableSideDishDTOList(product.getSideDishes()),
								product.getImagePath()));
	}
		
	public static Iterable<IdentifiableDTO<ProductDTO>> MapProductCategoryCollectionToIdentifiableProductDTOCollection(Iterable<ProductCategory> productCategories){
		if (productCategories == null) throw new IllegalArgumentException();

		List<IdentifiableDTO<ProductDTO>> retVal = new ArrayList<>();
	
		productCategories.forEach((category) -> category.getProducts().forEach((product) -> retVal.add(MapProductToIdentifiableProductDTO(product, category))));
		return retVal;
	}
	
	public static IdentifiableDTO<NameDTO> MapEntityToIdentifiableEntityNameDTO(UUID id, String name){
		return new IdentifiableDTO<NameDTO>(id, new NameDTO(name));
	}
	
	public static List<IdentifiableDTO<NameDTO>> MapIngredientListToIdentifiableIngredientDTOList(List<Ingredient> ingredients){
		if (ingredients == null) throw new IllegalArgumentException();

		List<IdentifiableDTO<NameDTO>> retVal = new ArrayList<>();
		ingredients.forEach((ingredient) -> retVal.add(MapEntityToIdentifiableEntityNameDTO(ingredient.getId(), ingredient.getName())));

		return retVal;
	}
	
	public static List<IdentifiableDTO<NameDTO>> MapSideDishesListToIdentifiableSideDishDTOList(List<SideDish> sidDishes){
		if (sidDishes == null) throw new IllegalArgumentException();

		List<IdentifiableDTO<NameDTO>> retVal = new ArrayList<>();
		sidDishes.forEach((sidDish) -> retVal.add(MapEntityToIdentifiableEntityNameDTO(sidDish.getId(), sidDish.getName())));

		return retVal;
	}

	public static Iterable<IdentifiableDTO<ProductCustomerDTO>> MapProductCategoryCollectionToProductCustomerDTOCollection(
			Iterable<ProductCategory> productCategories) {
		if (productCategories == null) throw new IllegalArgumentException();

		List<IdentifiableDTO<ProductCustomerDTO>> retVal = new ArrayList<>();
	
		productCategories.forEach((category) -> category.getProducts().forEach((product) -> retVal.add(MapProductToProductCustomerDTO(product, category))));
		return retVal;
	}

	private static IdentifiableDTO<ProductCustomerDTO> MapProductToProductCustomerDTO(Product product,
			ProductCategory productCategory) {
		if(product == null) throw new IllegalArgumentException();
		
		return new IdentifiableDTO<ProductCustomerDTO>(product.getId(), new ProductCustomerDTO(MapEntityToIdentifiableEntityNameDTO(productCategory.getId(),productCategory.getName()),
				product.getName(), product.getDescription(), product.getPrice(), product.getProductAmount().getMeasureUnit().getMeasureUnitName(), product.getProductAmount().getAmount(),
				MapIngredientListToIdentifiableIngredientDTOList(product.getIngredients()),
				mapSideDishesListToSideDishCustomerDTOList(product.getSideDishes()),
				product.getImagePath()));	
		}

	private static List<SideDishCustomerDTO> mapSideDishesListToSideDishCustomerDTOList(List<SideDish> sideDishes) {
		// TODO Auto-generated method stub
		if (sideDishes == null) throw new IllegalArgumentException();

		List<SideDishCustomerDTO> retVal = new ArrayList<>();
		sideDishes.forEach((sideDish) -> retVal.add(new SideDishCustomerDTO(sideDish.getId(),sideDish.getName())));

		return retVal;	}
	


}
