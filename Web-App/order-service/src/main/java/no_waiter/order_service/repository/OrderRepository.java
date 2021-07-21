package no_waiter.order_service.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import no_waiter.order_service.entities.Order;

public interface OrderRepository extends PagingAndSortingRepository<Order, UUID>{

}
