package NoWaiter.ObjectService.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.ObjectService.entities.ObjectAdmin;

public interface ObjectAdminRepository extends PagingAndSortingRepository<ObjectAdmin, UUID>{

}
