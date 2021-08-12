package NoWaiter.ObjectService.api;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import NoWaiter.ObjectService.intercomm.AuthClient;
import NoWaiter.ObjectService.intercomm.UserClient;
import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.TableService;
import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.JwtParseResponseDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.UpdateWorkTimeDTO;
import NoWaiter.ObjectService.services.contracts.dto.UserClientObjectDTO;
import NoWaiter.ObjectService.services.contracts.exceptions.InvalidTimeRangeException;
import feign.FeignException;

@RestController
@RequestMapping(value = "api/objects")
public class Api {

    @Autowired
    private ObjectService objectService;
    
    @Autowired
    private TableService tableService;
    
    @Autowired
    private UserClient userClient;
    
    @Autowired
    private AuthClient authClient;

    @Autowired
	private Environment env;
    
    @GetMapping("/object-images/{imageName}")
	@CrossOrigin
	public ResponseEntity<?> getProductImage(@PathVariable String imageName) {
		byte[] image = new byte[0];
        try {
            image = FileUtils.readFileToByteArray(new File(env.getProperty("rel-image-path")+ "//"+ imageName));
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }
    
    @GetMapping("/customers")
	@CrossOrigin
	public ResponseEntity<?> getObjectForCustomers() {
    	try {
            return new ResponseEntity<>(objectService.getObjectsForCustomers(), HttpStatus.OK);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/customers/{objectId}")
	@CrossOrigin
	public ResponseEntity<?> getObjectForCustomers(@PathVariable String objectId) {
    	try {
            return new ResponseEntity<>(objectService.getObjectDetailsForCustomer(UUID.fromString(objectId)), HttpStatus.OK);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @PostMapping
    @CrossOrigin
    public ResponseEntity<?> createObject(@RequestBody ObjectDTO objectDTO) {

        try {
            UUID objectId = objectService.create(objectDTO);
            return new ResponseEntity<>(objectId, HttpStatus.CREATED);

        } catch (DataIntegrityViolationException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getRootCause().getMessage(), HttpStatus.CONFLICT);
		} catch (Exception e) {
			e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/details")
    @CrossOrigin
    public ResponseEntity<?> getObjectDetailsByObjectIds(@RequestBody List<UUID> objectIds){

        try {
            return new ResponseEntity<>(objectService.findAllObjectDetailsById(objectIds), HttpStatus.OK);

        } catch (Exception e) {
			e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{objectId}")
    @CrossOrigin
    public ResponseEntity<?> findById(@PathVariable UUID objectId) {

        try {
            return new ResponseEntity<>(objectService.findById(objectId), HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/admin")
    @CrossOrigin
    public ResponseEntity<?> findByAdminId(@RequestHeader("Authorization") String token) {
    	try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
            IdentifiableDTO<ObjectDTO> object = objectService.findByObjectAdminId(jwtResponse.getId());
            return new ResponseEntity<>(object, HttpStatus.OK);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/table/{objectId}/{tableId}")
    @CrossOrigin	
    public ResponseEntity<?> getTableNumberByTableIdForResturant(@PathVariable UUID objectId,  @PathVariable UUID tableId) {
    	try {
    		int tableNumber = objectService.getTableNumberByTableIdForResturant(objectId,tableId);
            return new ResponseEntity<>(tableNumber, HttpStatus.OK);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/tables")
    @CrossOrigin
    public ResponseEntity<?> createTable(@RequestHeader("Authorization") String token) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
            return new ResponseEntity<>(tableService.createTable(jwtResponse.getId()), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/tables")
    @CrossOrigin
    public ResponseEntity<?> findAllTables(@RequestHeader("Authorization") String token) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId;
			if (hasRole(jwtResponse.getAuthorities(), "ROLE_OBJADMIN")) {
				objectId = objectService.findByObjectAdminId(jwtResponse.getId()).Id;
			} else {
				objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			}

			return new ResponseEntity<>(tableService.findAllForObjectById(objectId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    private boolean hasRole(List<String> authorities, String role) {
		System.out.println(role);
		for (String auth : authorities) {
			System.out.println(auth);
			if(auth.equals(role)) {
				return true;
			}
		}
		return false;
	}
    
    @DeleteMapping("/tables/{tableId}")
    @CrossOrigin
    public ResponseEntity<?> deleteTable(@RequestHeader("Authorization") String token, @PathVariable UUID tableId) {
        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
        	tableService.deleteTable(jwtResponse.getId(), tableId);
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        }  catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/admin")
    @CrossOrigin
    public ResponseEntity<?> addAdminToObject(@RequestBody AddAdminDTO addAdminDTO) {

        try {
            objectService.addAdminToObject(addAdminDTO);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admin/{adminId}")
    @CrossOrigin
    public ResponseEntity<?> deleteObjectAdmin(@PathVariable UUID adminId) {
        try {
        	objectService.deleteObjectAdminHandlingObjectActivation(adminId);
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        }  catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping
    @CrossOrigin
    public ResponseEntity<?> findAllObjects() {

        try {
            return new ResponseEntity<>(objectService.findAllForAdmin(), HttpStatus.OK);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping
    @CrossOrigin
    public ResponseEntity<?> updateObject(@RequestBody IdentifiableDTO<ObjectDTO> objectDTO) {

        try {
        	IdentifiableDTO<ObjectDTO> objDto = objectService.findById(objectDTO.Id);
        	if(!objDto.EntityDTO.Name.equals(objectDTO.EntityDTO.Name))
        		userClient.updateObject(new UserClientObjectDTO(objectDTO.Id, objectDTO.EntityDTO.Name));
        	
        	objectService.update(objectDTO);
            return new ResponseEntity<>(HttpStatus.OK);

        }catch (DataIntegrityViolationException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getRootCause().getMessage(), HttpStatus.CONFLICT);
		} catch (FeignException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @PutMapping("/image")
    @CrossOrigin
    public ResponseEntity<?> updateObjectImage(@RequestHeader("Authorization") String token, @RequestParam("image") MultipartFile multipartFile) {

        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
        	objectService.updateImage(multipartFile, jwtResponse.getId());
        	
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (IOException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/worktime")
    @CrossOrigin
    public ResponseEntity<?> updateWorkTime(@RequestBody UpdateWorkTimeDTO updateWorkTimeDTO) {

        try {
        	objectService.updateWorkTime(updateWorkTimeDTO);
        	
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{objectId}/activate")
    @CrossOrigin
    public ResponseEntity<?> activateObject(@PathVariable UUID objectId) {

        try {
        	objectService.toggleObjectActivation(objectId, true);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{objectId}/deactivate")
    @CrossOrigin
    public ResponseEntity<?> deactivateObject(@PathVariable UUID objectId) {

        try {
        	objectService.toggleObjectActivation(objectId, false);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{objectId}/block")
    @CrossOrigin
    public ResponseEntity<?> blockObject(@PathVariable UUID objectId) {

        try {
        	objectService.toggleObjectBlock(objectId, true);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{objectId}/unblock")
    @CrossOrigin
    public ResponseEntity<?> unblockObject(@PathVariable UUID objectId) {

        try {
        	objectService.toggleObjectBlock(objectId, false);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkObject/{objectId}")
    @CrossOrigin
    public ResponseEntity<?> checkObject(@PathVariable UUID objectId){

        try {
            objectService.findById(objectId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/admin/{objectAdminId}")
    @CrossOrigin
    public ResponseEntity<?> getObjectId(@PathVariable UUID objectAdminId){

        try {
            IdentifiableDTO<ObjectDTO> object = objectService.findByObjectAdminId(objectAdminId);
            return new ResponseEntity<>(object.Id, HttpStatus.OK);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/worktime")
    @CrossOrigin
    public ResponseEntity<?> worktime() {
    	try {
    		objectService.worktime();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (InvalidTimeRangeException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/self-ordering-jwt")
    @CrossOrigin
    public ResponseEntity<?> generateSelfOrderingJWTToken(@RequestHeader("Authorization") String token) {
        try {
        	String jwtToken = authClient.generateSelfOrderingJWTToken(token);
            return new ResponseEntity<>(jwtToken,HttpStatus.CREATED);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{objectId}")
    @CrossOrigin
    public ResponseEntity<?> updateObjectImage(@PathVariable String objectId) {

        try {
        	userClient.deleteObjectWorkers(UUID.fromString(objectId));
        	objectService.deleteObject(UUID.fromString(objectId));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
