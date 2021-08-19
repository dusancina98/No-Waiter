package no_waiter.order_service.services.contracts.dto;

import java.util.UUID;

public class SideDishResponseDTO {
	public UUID Id;
	public NameDTO EntityDTO;
	
	public SideDishResponseDTO(UUID id, NameDTO entityDTO) {
		super();
		Id = id;
		EntityDTO = entityDTO;
	}
}
