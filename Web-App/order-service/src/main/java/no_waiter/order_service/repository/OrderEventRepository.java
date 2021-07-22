package no_waiter.order_service.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import no_waiter.order_service.entities.OrderEvent;

public interface OrderEventRepository extends PagingAndSortingRepository<OrderEvent, UUID> {

}
