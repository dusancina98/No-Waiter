package NoWaiter.UserService.services.contracts.dto;

import java.util.UUID;

public class RestaurantAdminDTO extends UserDTO {

    public UUID RestaurantId;

    public RestaurantAdminDTO() {
    }

    public RestaurantAdminDTO(String email, String name, String surname, UUID restaurantId) {
        super(email, name, surname);
        RestaurantId = restaurantId;
    }
}
