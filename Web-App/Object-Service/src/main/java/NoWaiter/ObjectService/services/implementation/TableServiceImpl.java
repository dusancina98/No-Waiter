package NoWaiter.ObjectService.services.implementation;

import java.util.UUID;

import javax.security.auth.message.AuthException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NoWaiter.ObjectService.entities.Object;
import NoWaiter.ObjectService.entities.Table;
import NoWaiter.ObjectService.repository.ObjectAdminRepository;
import NoWaiter.ObjectService.repository.TableRepository;
import NoWaiter.ObjectService.services.contracts.TableService;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.TableDTO;
import NoWaiter.ObjectService.services.implementation.util.TableMapper;

@Service
public class TableServiceImpl implements TableService{

	@Autowired
	private TableRepository tableRepository;
	
	@Autowired
	private ObjectAdminRepository objectAdminRepository;
	
	@Override
	public IdentifiableDTO<TableDTO> createTable(UUID objectAdminId) {
		
		Object object = objectAdminRepository.findObjectByAdminId(objectAdminId);
		int tableNumber = 0;
		try {
			tableNumber = tableRepository.findMaxTableNumberByObjectId(object.getId());
		} catch (Exception e) {
			e.printStackTrace();
		}
		TableDTO tableDTO = new TableDTO(tableNumber + 1);
		Table table = TableMapper.MapTableDTOToTable(tableDTO, object);
		tableRepository.save(table);
		
		return TableMapper.MapTableToIdentifiableTableDTO(table);
	}

	@Override
	public Iterable<IdentifiableDTO<TableDTO>> findAllForObject(UUID objectAdminId) {

		Object object = objectAdminRepository.findObjectByAdminId(objectAdminId);
		return TableMapper.MapTableCollectionToIdentifiableTableDTOCollection(tableRepository.findAllByObjectId(object.getId()));
	}

	@Override
	public void deleteTable(UUID objectAdminId, UUID tableId) throws AuthException {
		
		Object object = objectAdminRepository.findObjectByAdminId(objectAdminId);
		Table table = tableRepository.findById(tableId).get();
		if(!table.getObject().getId().equals(object.getId())) throw new AuthException("Unauthorized");
		
		tableRepository.deleteById(tableId);
	}

}