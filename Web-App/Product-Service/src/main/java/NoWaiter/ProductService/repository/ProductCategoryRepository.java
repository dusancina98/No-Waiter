package NoWaiter.ProductService.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.ProductService.entities.ProductCategory;

public interface ProductCategoryRepository extends PagingAndSortingRepository<ProductCategory, UUID>{

}
