package NoWaiter.UserService.repository;

import NoWaiter.UserService.entities.ObjectAdmin;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface RestaurantAdminRepository extends PagingAndSortingRepository<ObjectAdmin, UUID> {
}
