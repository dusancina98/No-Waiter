package NoWaiter.ObjectService.api;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.ObjectService.intercomm.AuthClient;
import NoWaiter.ObjectService.intercomm.UserClient;
import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.TableService;
import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.JwtParseResponseDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import NoWaiter.ObjectService.services.contracts.dto.UserClientObjectDTO;
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
            UUID objectId = objectService.Create(objectDTO);
            return new ResponseEntity<>(objectId, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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
    
    @PostMapping("/admin")
    @CrossOrigin
    public ResponseEntity<?> addAdminToObject(@RequestBody AddAdminDTO addAdminDTO) {

        try {
            objectService.AddAdminToObject(addAdminDTO);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<?> findAllObjects() {

        try {
            return new ResponseEntity<>(objectService.FindAllForAdmin(), HttpStatus.OK);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping
    @CrossOrigin
    public ResponseEntity<?> updateObject(@RequestBody IdentifiableDTO<ObjectDTO> objectDTO) {

        try {
        	IdentifiableDTO<ObjectDTO> objDto = objectService.FindById(objectDTO.Id);
        	if(!objDto.EntityDTO.Name.equals(objectDTO.EntityDTO.Name))
        		userClient.updateObject(new UserClientObjectDTO(objectDTO.Id, objectDTO.EntityDTO.Name));
        	objectService.Update(objectDTO);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (FeignException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{objectId}/activate")
    @CrossOrigin
    public ResponseEntity<?> activateObject(@PathVariable UUID objectId) {

        try {
        	objectService.ToggleObjectActivation(objectId, true);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{objectId}/deactivate")
    @CrossOrigin
    public ResponseEntity<?> deactivateObject(@PathVariable UUID objectId) {

        try {
        	objectService.ToggleObjectActivation(objectId, false);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{objectId}/block")
    @CrossOrigin
    public ResponseEntity<?> blockObject(@PathVariable UUID objectId) {

        try {
        	objectService.ToggleObjectBlock(objectId, true);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{objectId}/unblock")
    @CrossOrigin
    public ResponseEntity<?> unblockObject(@PathVariable UUID objectId) {

        try {
        	objectService.ToggleObjectBlock(objectId, false);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkObject/{objectId}")
    @CrossOrigin
    public ResponseEntity<?> checkObject(@PathVariable UUID objectId){

        try {
            objectService.FindById(objectId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
