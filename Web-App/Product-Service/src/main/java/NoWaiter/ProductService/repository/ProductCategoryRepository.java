package NoWaiter.ProductService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.ProductService.entities.ProductCategory;

public interface ProductCategoryRepository extends PagingAndSortingRepository<ProductCategory, UUID>{

	@Query(value = "SELECT pc FROM ProductCategory pc WHERE pc.objectId = ?1")
	Iterable<ProductCategory> findAllByObjectId(UUID objectId);

}
