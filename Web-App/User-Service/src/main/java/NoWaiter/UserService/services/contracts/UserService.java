package NoWaiter.UserService.services.contracts;

import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import NoWaiter.UserService.entities.AccountActivationToken;
import NoWaiter.UserService.entities.ResetPasswordToken;
import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.dto.RequestEmailDTO;
import NoWaiter.UserService.services.contracts.dto.ResetPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateObjectAdminRequestDTO;
import NoWaiter.UserService.services.contracts.dto.UpdateWaiterDTO;
import NoWaiter.UserService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.UserService.services.contracts.dto.WaiterDTO;
import NoWaiter.UserService.services.contracts.exceptions.ClassFieldValidationException;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsedException;
import NoWaiter.UserService.services.contracts.exceptions.NonExistentUserEmailException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordIsNotStrongException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordsIsNotTheSameException;
import NoWaiter.UserService.services.contracts.exceptions.ResetPasswordTokenExpiredOrUsedException;
import NoWaiter.UserService.services.contracts.exceptions.TokenNotFoundException;

public interface UserService {

    UUID createObjectAdmin(ObjectAdminDTO entity) throws Exception;

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

}
