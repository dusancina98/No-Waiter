package NoWaiter.UserService.repository;

import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.entities.User;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface ObjectAdminRepository extends PagingAndSortingRepository<ObjectAdmin, UUID> {
}
