package NoWaiter.UserService.services.implementation.util;

import NoWaiter.UserService.entities.RestaurantAdmin;
import NoWaiter.UserService.services.contracts.dto.RestaurantAdminDTO;

public class UserMapper {

    public static RestaurantAdmin MapRestaurantAdminDTOToRestaurantAdmin(RestaurantAdminDTO restaurantAdminDTO){
        if (restaurantAdminDTO == null) throw new IllegalArgumentException();

        return new RestaurantAdmin(restaurantAdminDTO.Email, "", restaurantAdminDTO.Name, restaurantAdminDTO.Surname, restaurantAdminDTO.RestaurantId);
    }

}
