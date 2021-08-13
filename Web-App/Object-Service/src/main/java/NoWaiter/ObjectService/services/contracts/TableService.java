package NoWaiter.ObjectService.services.contracts;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.UUID;

import javax.security.auth.message.AuthException;

import com.google.zxing.WriterException;

import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.TableDTO;

public interface TableService {

	IdentifiableDTO<TableDTO> createTable(UUID objectAdminId) throws Exception;
		
	Iterable<IdentifiableDTO<TableDTO>> findAllForObjectById(UUID objectId);
	
	void deleteTable(UUID objectAdminId, UUID tableId) throws AuthException;
}
