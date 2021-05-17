package NoWaiter.ObjectService.services.contracts;

import java.util.UUID;

import javax.security.auth.message.AuthException;

import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.TableDTO;

public interface TableService {

	IdentifiableDTO<TableDTO> createTable(UUID objectAdminId);
	
	Iterable<IdentifiableDTO<TableDTO>> findAllForObject(UUID objectAdminId);
	
	void deleteTable(UUID objectAdminId, UUID tableId) throws AuthException;
}
