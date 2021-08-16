package NoWaiter.UserService.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="AUTHORITY")
public class Authority  {

	@Id
    @Column(name = "id")
	private UUID id;

    @Column(name="name", unique=true)
    String name;

	public Authority() {}
	
	public Authority(UUID id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
    
    public String getAuthority() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(UUID id) {
        this.id = id;
    }

}
