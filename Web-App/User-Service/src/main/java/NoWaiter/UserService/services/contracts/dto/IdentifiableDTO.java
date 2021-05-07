package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class IdentifiableDTO<T> {

    public UUID Id;
    public T EntityDTO;

    public IdentifiableDTO() {
    }

    public IdentifiableDTO(UUID id, T entityDTO) {
        super();
        Id = id;
        EntityDTO = entityDTO;
    }
}
