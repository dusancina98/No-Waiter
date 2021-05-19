package NoWaiter.UserService.services.contracts;

import java.util.UUID;

import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.RequestEmailDTO;
import NoWaiter.UserService.services.contracts.dto.ResetPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateWaiterDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsed;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;
import NoWaiter.UserService.services.contracts.exceptions.NonExistentUserEmailException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordIsNotStrongException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordsIsNotTheSameException;
import NoWaiter.UserService.services.contracts.exceptions.ResetPasswordTokenExpiredOrUsedException;

public interface UserService {

    UUID createObjectAdmin(ObjectAdminDTO entity) throws Exception;

    void updateObjectAdmin(IdentifiableDTO<UpdateObjectAdminRequestDTO> entity) throws ClassFieldValidationException;

    void deleteObjectAdmin(UUID objectAdminId);
    
    void updateWaiter(IdentifiableDTO<UpdateWaiterDTO> entity) throws ClassFieldValidationException;
        
    void updateObjects(UserClientObjectDTO entity);
    
    UUID createWaiter(WaiterDTO entity, UUID objectAdminId) throws ClassFieldValidationException;
    
    Iterable<IdentifiableDTO<ObjectAdminDTO>> findAllObjectAdmins();
    
    Iterable<IdentifiableDTO<WaiterDTO>> findAllWaiters(UUID objectAdminId);

	String checkUserExistance(UUID userId);

	void createActivationLink(UUID userId) throws Exception;

	void activateUser(UUID activationId) throws ActivationLinkExpiredOrUsed;

	UUID isUserFirstLogin(UUID activationId);

	void changeFirstPassword(ChangeFirstPasswordDTO changeFirstPasswordDTO) throws PasswordsIsNotTheSameException, PasswordIsNotStrongException;

	void resetPasswordLinkRequest(RequestEmailDTO requestEmailDTO) throws NonExistentUserEmailException;

	void resetPassword(ResetPasswordDTO resetPasswordDTO) throws ResetPasswordTokenExpiredOrUsedException, PasswordsIsNotTheSameException, PasswordIsNotStrongException;
}
