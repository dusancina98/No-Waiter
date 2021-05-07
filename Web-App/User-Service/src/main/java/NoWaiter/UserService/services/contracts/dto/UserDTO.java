package NoWaiter.UserService.services.contracts.dto;

public class UserDTO {

    public String Email;

    public String Name;

    public String Surname;

    public UserDTO() { }

    public UserDTO(String email, String name, String surname) {
        Email = email;
        Name = name;
        Surname = surname;
    }
}
