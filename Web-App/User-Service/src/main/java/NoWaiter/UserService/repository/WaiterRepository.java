package NoWaiter.UserService.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.UserService.entities.Waiter;

public interface WaiterRepository extends PagingAndSortingRepository<Waiter, UUID>{

}
