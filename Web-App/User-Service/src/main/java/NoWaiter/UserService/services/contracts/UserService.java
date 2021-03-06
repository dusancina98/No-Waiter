package NoWaiter.UserService.services.contracts;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.UUID;

import NoWaiter.UserService.entities.AccountActivationToken;
import NoWaiter.UserService.entities.ResetPasswordToken;
import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.CustomerDTO;
import NoWaiter.UserService.services.contracts.dto.CustomerProfileDTO;
import NoWaiter.UserService.services.contracts.dto.EditCustomerDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.NameDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.RequestEmailDTO;
import NoWaiter.UserService.services.contracts.dto.ResetPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateWaiterDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsedException;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;
import NoWaiter.UserService.services.contracts.exceptions.NonExistentUserEmailException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordIsNotStrongException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordsIsNotTheSameException;
import NoWaiter.UserService.services.contracts.exceptions.ResetPasswordTokenExpiredOrUsedException;
import NoWaiter.UserService.services.contracts.exceptions.TokenNotFoundException;

public interface UserService {
	
    boolean isObjectInFavourites(UUID customerID, UUID objectId);
	
    List<UUID> findAllCustomerFavouriteObjectIds(UUID customerID);
	
    UUID createObjectAdmin(ObjectAdminDTO entity) throws Exception;
    
    UUID createCustomer(CustomerDTO entity)  throws ClassFieldValidationException, Exception;

    CustomerProfileDTO getLoggedCustomer(UUID customerId);
    
    Iterable<IdentifiableDTO<NameDTO>> getLoggedCustomerAddresses(UUID customerId);

    void deleteCustomerAddress(UUID customerId, UUID addressId);

    UUID addCustomerAddress(UUID customerId, NameDTO addressDTO);
    
    void addObjectToCustomerFavourites(UUID customerId, UUID objectId);
    
    void removeObjectFromCustomerFavourites(UUID customerId, UUID objectId);
    
    void updateCustomer(EditCustomerDTO customerDTO, UUID customerId);
    
    void updateObjectAdmin(IdentifiableDTO<UpdateObjectAdminRequestDTO> entity) throws ClassFieldValidationException;

    void deleteObjectAdmin(UUID objectAdminId);
    
    void updateWaiter(IdentifiableDTO<UpdateWaiterDTO> entity) throws ClassFieldValidationException;
        
    void updateObjects(UserClientObjectDTO entity);
    
    UUID createWaiter(WaiterDTO entity, UUID objectAdminId) throws ClassFieldValidationException, Exception;
    
    Iterable<IdentifiableDTO<ObjectAdminDTO>> findAllObjectAdmins();
    
    Iterable<IdentifiableDTO<WaiterDTO>> findAllWaiters(UUID objectAdminId);
    
    UUID findObjectIdByWaiterId(UUID waiterId);

	String checkUserExistance(UUID userId);

	void createActivationLink(UUID userId) throws Exception;

	void changeFirstPassword(ChangeFirstPasswordDTO changeFirstPasswordDTO) throws PasswordsIsNotTheSameException, PasswordIsNotStrongException, ActivationLinkExpiredOrUsedException, TokenNotFoundException;

	void resetPasswordLinkRequest(RequestEmailDTO requestEmailDTO) throws NonExistentUserEmailException, NoSuchAlgorithmException;

	void resetPassword(ResetPasswordDTO resetPasswordDTO) throws ResetPasswordTokenExpiredOrUsedException, PasswordsIsNotTheSameException, PasswordIsNotStrongException, TokenNotFoundException;

	void activateUser(String token) throws ActivationLinkExpiredOrUsedException, TokenNotFoundException;

	UUID isUserFirstLogin(String token);

	AccountActivationToken isValidAccountActivationLink(String token) throws TokenNotFoundException, ActivationLinkExpiredOrUsedException;

	ResetPasswordToken isValidResetPasswordToken(String token) throws TokenNotFoundException, ResetPasswordTokenExpiredOrUsedException;

	void deleteWaiter(UUID waiterId);

	void deleteObjectWorkers(UUID objectId);

	int getPenaltiesForCustomer(UUID customerId);

	void incrementCustomerPenalties(UUID customerId);

}
