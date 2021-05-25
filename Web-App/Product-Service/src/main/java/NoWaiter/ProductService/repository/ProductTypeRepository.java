package NoWaiter.ProductService.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.ProductService.entities.ProductType;

public interface ProductTypeRepository extends PagingAndSortingRepository<ProductType, UUID>{

}
