package NoWaiter.ObjectService.services.implementation;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NoWaiter.ObjectService.entities.Object;
import NoWaiter.ObjectService.repository.ObjectRepository;
import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.implementation.util.ObjectMapper;

@Service
public class ObjectServiceImpl implements ObjectService {

    @Autowired
    private ObjectRepository objectRepository;

    @Override
    public UUID Create(ObjectDTO entity) {
        Object object = ObjectMapper.MapObjectDTOToObject(entity);
        objectRepository.save(object);
        return object.getId();
    }

    @Override
    public IdentifiableDTO<ObjectDTO> FindById(UUID id) {
        return ObjectMapper.MapObjectToIdentifiableObjectDTO(objectRepository.findById(id).get());
    }

    @Override
    public Iterable<IdentifiableDTO<ObjectDTO>> FindAll() {
        return ObjectMapper.MapObjectCollectionToIdentifiableObjectDTOCollection(objectRepository.findAll());
    }
}
