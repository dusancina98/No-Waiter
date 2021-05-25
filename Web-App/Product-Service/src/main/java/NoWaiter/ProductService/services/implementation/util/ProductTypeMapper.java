package NoWaiter.ProductService.services.implementation.util;

import java.util.ArrayList;
import java.util.List;

import NoWaiter.ProductService.entities.ProductType;
import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ProductService.services.contracts.dto.NameDTO;

public class ProductTypeMapper {

	public static IdentifiableDTO<NameDTO> MapProductTypeToIdentifiableProductTypeDTO(ProductType productType) {
		if(productType == null) throw new IllegalArgumentException();
		
		return new IdentifiableDTO<NameDTO>(productType.getId(), new NameDTO(productType.getName()));
	}
	
	public static Iterable<IdentifiableDTO<NameDTO>> MapProductTypeCollectionToIdentifiableTypeDTOCollection(Iterable<ProductType> productTypes){
		if (productTypes == null) throw new IllegalArgumentException();

		List<IdentifiableDTO<NameDTO>> retVal = new ArrayList<>();
		productTypes.forEach((type) -> retVal.add(MapProductTypeToIdentifiableProductTypeDTO(type)));

		return retVal;
	}
}
