package NoWaiter.UserService.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import NoWaiter.UserService.entities.Customer;

public interface CustomerRepository extends PagingAndSortingRepository<Customer, UUID> {
    @Query(value = "SELECT c FROM Customer c WHERE c.penalties > 0 AND c.penalties < 3")
	List<Customer> getCustomersForDeletingPenalties();

}
