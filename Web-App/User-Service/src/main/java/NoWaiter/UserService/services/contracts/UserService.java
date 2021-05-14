package NoWaiter.UserService.services.contracts;

import java.util.UUID;

import NoWaiter.UserService.services.contracts.dto.ChangeFirstPasswordDTO;
import NoWaiter.UserService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;
import NoWaiter.UserService.services.contracts.exceptions.ActivationLinkExpiredOrUsed;
import NoWaiter.UserService.services.contracts.exceptions.PasswordIsNotStrongException;
import NoWaiter.UserService.services.contracts.exceptions.PasswordsIsNotTheSameException;

public interface UserService {

    UUID CreateRestaurantAdmin(ObjectAdminDTO entity) throws Exception;
    
    Iterable<IdentifiableDTO<ObjectAdminDTO>> FindAllObjectAdmins();

	String checkUserExistance(UUID userId);

	void createActivationLink(UUID userId) throws Exception;

	void activateUser(UUID activationId) throws ActivationLinkExpiredOrUsed;

	UUID isUserFirstLogin(UUID activationId);

	void changeFirstPassword(ChangeFirstPasswordDTO changeFirstPasswordDTO) throws PasswordsIsNotTheSameException, PasswordIsNotStrongException;
}
