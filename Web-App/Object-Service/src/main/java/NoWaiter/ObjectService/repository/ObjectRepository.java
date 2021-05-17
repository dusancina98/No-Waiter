package NoWaiter.ObjectService.repository;

import NoWaiter.ObjectService.entities.Object;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface ObjectRepository extends PagingAndSortingRepository<Object, UUID> {
}
