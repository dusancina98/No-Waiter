package NoWaiter.ObjectService.services.contracts.dto;

public class ObjectDTO {

    public String Name;

    public String Email;

    public String PhoneNumber;

    public ObjectDTO() { }

    public ObjectDTO(String name, String email, String phoneNumber) {
        Name = name;
        Email = email;
        PhoneNumber = phoneNumber;
    }
}
