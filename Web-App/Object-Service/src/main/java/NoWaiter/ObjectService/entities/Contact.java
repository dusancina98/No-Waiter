package NoWaiter.ObjectService.entities;

import javax.persistence.Embeddable;

@Embeddable
public class Contact {

    private String phoneNumber;

    private String email;

    public Contact() { }

    public Contact(String phoneNumber, String email) {
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }
}
