package NoWaiter.AuthService.services.contracts.dto;

import java.util.List;

public class UserTokenStateDTO {
	private String accessToken;
    private List<String> roles;
    private Long expiresIn;
    private String name;
    private String surname;
    private String image;
    
    public UserTokenStateDTO() {
        this.accessToken = null;
        this.expiresIn = null;
    }

    public UserTokenStateDTO(String accessToken, long expiresIn, List<String> roles, String name, String surname, String image) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.roles = roles;
        this.name= name;
        this.surname= surname;
        this.image=image;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
    
    public List<String> getRoles() {
        return roles;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
}
