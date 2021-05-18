package NoWaiter.ObjectService.services.implementation.util;

import java.util.ArrayList;
import java.util.List;

import NoWaiter.ObjectService.entities.Object;
import NoWaiter.ObjectService.entities.Table;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.TableDTO;

public class TableMapper {

	public static Table MapTableDTOToTable(TableDTO tableDTO, Object object){
        if (tableDTO == null) throw new IllegalArgumentException();

        return new Table(tableDTO.Number, object);
    }

    public static IdentifiableDTO<TableDTO> MapTableToIdentifiableTableDTO(Table table){
        if (table == null) throw new IllegalArgumentException();
        
        return new IdentifiableDTO<TableDTO>(table.getId(), new TableDTO(table.getNumber()));
    }

    public static Iterable<IdentifiableDTO<TableDTO>> MapTableCollectionToIdentifiableTableDTOCollection(Iterable<Table> tables){
        if (tables == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<TableDTO>> retVal = new ArrayList<>();
        tables.forEach((table) -> retVal.add(MapTableToIdentifiableTableDTO(table	)));

        return retVal;
    }
}
