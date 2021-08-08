package NoWaiter.ObjectService.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Where;

import NoWaiter.ObjectService.services.contracts.exceptions.InvalidTimeRangeException;

@Entity
@Where(clause = "deleted=false")
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
    
    private boolean deleted = Boolean.FALSE;

    @OneToMany(mappedBy = "object")
    private List<ObjectAdmin> admins;
    
    @OneToMany(mappedBy = "object")
    private List<Table> tables;

    @OneToOne(optional= false)
    private WorkTime workTime;

    public Object(UUID id, String name, Address address, Contact contact, String imagePath, boolean active, boolean blocked, List<ObjectAdmin> admins, List<Table> tables, WorkTime workTime, boolean deleted) throws InvalidTimeRangeException {
        this.id = id;
        this.name = name;
        this.address = address;
        this.contact = contact;
        this.imagePath = imagePath;
        this.active = active;
        this.blocked = blocked;
        this.admins = admins;
        this.tables = tables;
        this.workTime= workTime;
        this.deleted= deleted;
    }

    public Object(String name, Address address, Contact contact, String imagePath, WorkTime workTime) throws InvalidTimeRangeException {
        this (UUID.randomUUID(), name, address, contact, imagePath, false, false, new ArrayList<ObjectAdmin>(), new ArrayList<Table>(), workTime,false);
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
    
    public void Activate() {
    	this.active = true;
    }
  
    public void Deactivate() {
    	this.active = false;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void Block() {
    	this.blocked = true;
    }
    
    public void Unblock() {
    	this.blocked = false;
    }
    
	public List<ObjectAdmin> getAdmins() {
		return admins;
	}
	
	public void addAmin(ObjectAdmin objectAdmin) {
		if(admins == null) 
			admins = new ArrayList<ObjectAdmin>();
		
		admins.add(objectAdmin);		
	}

	public List<Table> getTables() {
		return tables;
	}

	public void addTable(Table table) {
		if(tables == null) 
			tables = new ArrayList<Table>();
		
		tables.add(table);
	}

	public WorkTime getWorkTime() {
		return workTime;
	}
	

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public void Delete() {
		this.setDeleted(true);
	}
}
