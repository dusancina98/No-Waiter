package no_waiter.order_service.entities;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Address {

	@Column(nullable = true)
    private String address;

    public Address() { }

    public Address(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }
}
