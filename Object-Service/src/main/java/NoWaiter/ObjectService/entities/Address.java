package NoWaiter.ObjectService.entities;

import javax.persistence.Embeddable;

@Embeddable
public class Address {

    private String address;

    public Address() { }

    public Address(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    private void setAddress(String address) {
        this.address = address;
    }
}
