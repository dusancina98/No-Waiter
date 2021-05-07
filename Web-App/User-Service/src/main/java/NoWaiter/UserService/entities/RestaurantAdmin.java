package NoWaiter.UserService.entities;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class RestaurantAdmin extends User{

    private UUID restaurantId;

    public RestaurantAdmin() {
    }

    public RestaurantAdmin(UUID id, String email, String password, String name, String surname, UUID restaurantId) {
        super(id, email, password, name, surname);
        this.restaurantId = restaurantId;
    }

    public RestaurantAdmin(String email, String password, String name, String surname, UUID restaurantId) {
        super(email, password, name, surname);
        this.restaurantId = restaurantId;
    }

    public UUID getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(UUID restaurantId) {
        this.restaurantId = restaurantId;
    }
}
