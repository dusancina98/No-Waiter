package NoWaiter.ObjectService.entities;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class Object {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Embedded
    private Address address;

    @Embedded
    private Contact contact;

    private String imagePath;

    private boolean active;

    private boolean blocked;

    public Object(UUID id, String name, Address address, Contact contact, String imagePath, boolean active, boolean blocked) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.contact = contact;
        this.imagePath = imagePath;
        this.active = active;
        this.blocked = blocked;
    }

    public Object(String name, Address address, Contact contact, String imagePath) {
        this (UUID.randomUUID(), name, address, contact, imagePath, false, true);
    }

    public Object() { }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }
}
