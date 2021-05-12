package NoWaiter.UserService.services.implementation;

import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.entities.Waiter;
import NoWaiter.UserService.repository.ObjectAdminRepository;
import NoWaiter.UserService.repository.WaiterRepository;
import NoWaiter.UserService.services.contracts.UserService;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.implementation.util.UserMapper;
import antlr.collections.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ObjectAdminRepository objectAdminRepository;
    
    @Autowired
    private WaiterRepository waiterRepository;

    @Override
    public UUID CreateObjectAdmin(ObjectAdminDTO entity) {
        ObjectAdmin restaurantAdmin = UserMapper.MapRestaurantAdminDTOToRestaurantAdmin(entity);
        objectAdminRepository.save(restaurantAdmin);
        return restaurantAdmin.getId();
    }

	@Override
	public Iterable<IdentifiableDTO<ObjectAdminDTO>> FindAllObjectAdmins() {
		return UserMapper.MapObjectAdminCollectionToIdentifiableObjectAdminDTOCollection(objectAdminRepository.findAll());
	}

	@Override
	public UUID CreateWaiter(WaiterDTO entity) {
		Waiter waiter = UserMapper.MapWaiterDTOToWaiter(entity);
		waiterRepository.save(waiter);
		return waiter.getId();
	}

	@Override
	public void UpdateObjectAdmin(IdentifiableDTO<UpdateObjectAdminRequestDTO> entity) {

		ObjectAdmin objectAdmin = objectAdminRepository.findById(entity.Id).get();
		objectAdmin.setAddress(entity.EntityDTO.Address);
		objectAdmin.setName(entity.EntityDTO.Name);
		objectAdmin.setSurname(entity.EntityDTO.Surname);
		objectAdmin.setPhoneNumber(entity.EntityDTO.PhoneNumber);
		objectAdminRepository.save(objectAdmin);
	}

	@Override
	@Transactional
	public void UpdateObjects(UserClientObjectDTO entity) {
		
		ArrayList<ObjectAdmin> objectAdmins = (ArrayList<ObjectAdmin>) objectAdminRepository.findByObjectId(entity.Id);
		for (ObjectAdmin objectAdmin : objectAdmins) {
			objectAdmin.setObjectName(entity.Name);
		}
		
		objectAdminRepository.saveAll(objectAdmins);
	}
}
