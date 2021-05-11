package NoWaiter.GatewayService.dto;

public class JwtParseRequestDTO {
	private String token;

    public JwtParseRequestDTO() {
    }

    public JwtParseRequestDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
