package NoWaiter.ObjectService.api;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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
            return new ResponseEntity<>(tableService.findAllForObject(jwtResponse.getId()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
}
