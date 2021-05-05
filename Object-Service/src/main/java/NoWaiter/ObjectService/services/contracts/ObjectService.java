package NoWaiter.ObjectService.services.contracts;

import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;

import java.util.UUID;

public interface ObjectService {

    UUID Create(ObjectDTO entity);
}
