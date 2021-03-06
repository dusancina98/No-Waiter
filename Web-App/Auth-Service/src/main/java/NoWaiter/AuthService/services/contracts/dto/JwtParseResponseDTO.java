package NoWaiter.AuthService.services.contracts.dto;

import java.util.List;
import java.util.UUID;

public class JwtParseResponseDTO {
	
	private UUID id;
	
	private String username;

    private List<String> authorities;

    public JwtParseResponseDTO() {
    }

    public JwtParseResponseDTO(UUID id, String username, List<String> authorities) {
    	this.id = id;
        this.username = username;
        this.authorities = authorities;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}
}
