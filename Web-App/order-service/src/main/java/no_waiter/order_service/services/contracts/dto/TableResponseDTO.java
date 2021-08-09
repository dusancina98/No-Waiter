package no_waiter.order_service.services.contracts.dto;

import java.util.UUID;

public class TableResponseDTO {
	public UUID Id;
	public int Number;
	
	public TableResponseDTO(UUID id, int number) {
		super();
		Id = id;
		Number = number;
	}

	
}
