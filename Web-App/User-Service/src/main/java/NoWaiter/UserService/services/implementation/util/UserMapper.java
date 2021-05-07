package NoWaiter.UserService.services.implementation.util;

import NoWaiter.UserService.entities.ObjectAdmin;
import NoWaiter.UserService.services.contracts.dto.ObjectAdminDTO;

public class UserMapper {

    public static ObjectAdmin MapRestaurantAdminDTOToRestaurantAdmin(ObjectAdminDTO restaurantAdminDTO){
        if (restaurantAdminDTO == null) throw new IllegalArgumentException();

        return new ObjectAdmin(restaurantAdminDTO.Email, "", restaurantAdminDTO.Name, restaurantAdminDTO.Surname, restaurantAdminDTO.ObjectId);
    }

}
