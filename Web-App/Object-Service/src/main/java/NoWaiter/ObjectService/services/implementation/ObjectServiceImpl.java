package NoWaiter.ObjectService.services.implementation;

import NoWaiter.ObjectService.entities.Address;
import NoWaiter.ObjectService.entities.Contact;
import NoWaiter.ObjectService.entities.Object;
import NoWaiter.ObjectService.repository.ObjectRepository;
import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ObjectServiceImpl implements ObjectService {

    @Autowired
    private ObjectRepository objectRepository;

    @Override
    public UUID Create(ObjectDTO entity) {
        Object object = new Object(entity.Name, new Address("Nova"), new Contact(entity.PhoneNumber, entity.Email), "ccc");
        objectRepository.save(object);

        return object.getId();
    }

    @Override
    public Iterable<Object> FindAll() {
        return objectRepository.findAll();
    }
}
