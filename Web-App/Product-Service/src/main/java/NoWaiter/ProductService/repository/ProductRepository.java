package NoWaiter.ProductService.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.ProductService.entities.Product;

public interface ProductRepository extends PagingAndSortingRepository<Product, UUID>{

}
