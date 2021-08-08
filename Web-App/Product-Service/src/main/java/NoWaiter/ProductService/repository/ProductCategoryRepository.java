package NoWaiter.ProductService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.ProductService.entities.ProductCategory;

public interface ProductCategoryRepository extends PagingAndSortingRepository<ProductCategory, UUID>{

	@Query(value = "SELECT pc FROM ProductCategory pc WHERE pc.objectId = ?1")
	Iterable<ProductCategory> findAllByObjectId(UUID objectId);

	@Query(value = "SELECT pc FROM ProductCategory pc WHERE pc.objectId = ?2 AND lower(pc.name) = ?1")
	List<ProductCategory> findWithCategoryNameAndObject(String name, UUID objectId);
}
