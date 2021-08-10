package NoWaiter.UserService.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.UserService.entities.Customer;

public interface CustomerRepository extends PagingAndSortingRepository<Customer, UUID> {

}
