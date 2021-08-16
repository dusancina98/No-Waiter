package NoWaiter.UserService.services.implementation.util;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import NoWaiter.UserService.entities.Address;
import NoWaiter.UserService.entities.Customer;
import NoWaiter.UserService.entities.Deliverer;
import NoWaiter.UserService.entities.DelivererRequest;
import NoWaiter.UserService.entities.DelivererStatus;
import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.entities.Waiter;
import NoWaiter.UserService.services.contracts.dto.CustomerDTO;
import NoWaiter.UserService.services.contracts.dto.DelivererDTO;
import NoWaiter.UserService.services.contracts.dto.DelivererRequestDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.NameDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;

public class UserMapper {

    public static ObjectAdmin MapRestaurantAdminDTOToRestaurantAdmin(ObjectAdminDTO objectAdminDTO) throws ClassFieldValidationException{
        if (objectAdminDTO == null) throw new IllegalArgumentException();

        return new ObjectAdmin(objectAdminDTO.Email, "", objectAdminDTO.Name, objectAdminDTO.Surname, objectAdminDTO.ObjectId, objectAdminDTO.ObjectName, objectAdminDTO.Address, objectAdminDTO.PhoneNumber);
    }
    
    public static IdentifiableDTO<ObjectAdminDTO> MapObjectAdminToIdentifiableObjectAdminDTO(ObjectAdmin objectAdmin){
        if (objectAdmin == null) throw new IllegalArgumentException();

        return new IdentifiableDTO<ObjectAdminDTO>(objectAdmin.getId(), new ObjectAdminDTO(objectAdmin.getEmail(), objectAdmin.getName(),
        		objectAdmin.getSurname(), objectAdmin.getObjectId(), objectAdmin.getObjectName(), objectAdmin.getAddress(), objectAdmin.getPhoneNumber()));
    }

    public static Iterable<IdentifiableDTO<ObjectAdminDTO>> MapObjectAdminCollectionToIdentifiableObjectAdminDTOCollection(Iterable<ObjectAdmin> objectAdmins){
        if (objectAdmins == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<ObjectAdminDTO>> retVal = new ArrayList<>();
        objectAdmins.forEach((object) -> retVal.add(MapObjectAdminToIdentifiableObjectAdminDTO(object)));

        return retVal;
    }

    public static Waiter MapWaiterDTOToWaiter(WaiterDTO waiterDTO, UUID objectId) throws ClassFieldValidationException {
    	if (waiterDTO == null) throw new IllegalArgumentException();
    	
    	return new Waiter(waiterDTO.Email, "", waiterDTO.Name, waiterDTO.Surname, waiterDTO.Address, waiterDTO.PhoneNumber, objectId);
    }
    
    public static IdentifiableDTO<WaiterDTO> MapWaiterToIdentifiableWaiterDTO(Waiter waiter){
        if (waiter == null) throw new IllegalArgumentException();

        return new IdentifiableDTO<WaiterDTO>(waiter.getId(), new WaiterDTO(waiter.getEmail(), waiter.getName(),
        		waiter.getSurname(), waiter.getAddress(), waiter.getPhoneNumber()));
    }

    public static Iterable<IdentifiableDTO<WaiterDTO>> MapWaiterCollectionToIdentifiableWaiterDTOCollection(Iterable<Waiter> waiters){
        if (waiters == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<WaiterDTO>> retVal = new ArrayList<>();
        waiters.forEach((waiter) -> retVal.add(MapWaiterToIdentifiableWaiterDTO(waiter)));

        return retVal;
    }
    
    public static DelivererRequest MapDelivererRequestDTOToDelivererRequest (DelivererRequestDTO delivererRequestDTO) throws ClassFieldValidationException{
        if (delivererRequestDTO == null) throw new IllegalArgumentException();

        return new DelivererRequest(delivererRequestDTO.Email,delivererRequestDTO.Name,delivererRequestDTO.Surname,delivererRequestDTO.PhoneNumber,delivererRequestDTO.Reference);
    }

	public static Deliverer MapDelivererRequestToDeliverer(DelivererRequest delivererRequest) throws ClassFieldValidationException {
        if (delivererRequest == null) throw new IllegalArgumentException();

        return new Deliverer(delivererRequest.getEmail(), " ", delivererRequest.getName(), delivererRequest.getSurname(), delivererRequest.getPhoneNumber(), DelivererStatus.ACTIVE, false);
	}

	public static Iterable<IdentifiableDTO<DelivererRequestDTO>> MapDelivererRequestCollectionToIdentifiableODelivererRequestDTOCollection(
			List<DelivererRequest> delivererRequests) {
		if (delivererRequests == null) throw new IllegalArgumentException();

        List<IdentifiableDTO<DelivererRequestDTO>> retVal = new ArrayList<>();
        delivererRequests.forEach((delivererRequest) -> retVal.add(MapDelivererRequestToIdentifiableDelivererDto(delivererRequest)));

        return retVal;
	}
	
	public static IdentifiableDTO<DelivererRequestDTO> MapDelivererRequestToIdentifiableDelivererDto(DelivererRequest delivererRequest) {
		if (delivererRequest == null) throw new IllegalArgumentException();

        return new IdentifiableDTO<DelivererRequestDTO>(delivererRequest.getId(),new DelivererRequestDTO(delivererRequest.getEmail(), delivererRequest.getName(), delivererRequest.getSurname(), delivererRequest.getPhoneNumber(), delivererRequest.getReference()));
	}
	
	public static IdentifiableDTO<DelivererDTO> MapDelivererToIdentifiableDelivererDto(Deliverer deliverer, double grade) {
		if (deliverer == null) throw new IllegalArgumentException();

        return new IdentifiableDTO<DelivererDTO>(deliverer.getId(),new DelivererDTO(deliverer.getEmail(), deliverer.getName(), deliverer.getSurname(), deliverer.getPhoneNumber(), deliverer.getDelivererStatus(),grade));
	}
    
	public static Customer MapCustomerDTOToCustomer(CustomerDTO customerDto) throws ClassFieldValidationException {
    	if (customerDto == null) throw new IllegalArgumentException();
    	
    	return new Customer(customerDto.Email, "", customerDto.Name, customerDto.Surname, customerDto.PhoneNumber, customerDto.Address);
    }
	
	public static Iterable<IdentifiableDTO<NameDTO>> MapAddressListToIdentifiableNameDTO(List<Address> addresses) {
		  List<IdentifiableDTO<NameDTO>> retVal = new ArrayList<>();
		  addresses.forEach((address) -> retVal.add(MapAddressToIdentifiableNameDTO(address)));
	      return retVal;
	}
	
	public static IdentifiableDTO<NameDTO> MapAddressToIdentifiableNameDTO(Address address){
		if (address == null) throw new IllegalArgumentException();

		return new IdentifiableDTO<NameDTO>(address.getId(), new NameDTO(address.getName()));
	}
}
