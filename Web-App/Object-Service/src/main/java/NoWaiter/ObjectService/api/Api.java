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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.dto.AddAdminDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;

@RestController
@RequestMapping(value = "api/objects")
public class Api {

    @Autowired
    private ObjectService objectService;

    @PostMapping
    @CrossOrigin
    public ResponseEntity<?> CreateObject(@RequestBody ObjectDTO objectDTO) {

        try {
            UUID objectId = objectService.Create(objectDTO);
            return new ResponseEntity<>(objectId, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/admin")
    @CrossOrigin
    public ResponseEntity<?> AddAdminToObject(@RequestBody AddAdminDTO addAdminDTO) {

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
    public ResponseEntity<?> FindAllObjects() {

        try {
            return new ResponseEntity<>(objectService.FindAllForAdmin(), HttpStatus.OK);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{objectId}/activate")
    @CrossOrigin
    public ResponseEntity<?> ActivateObject(@PathVariable UUID objectId) {

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
    public ResponseEntity<?> DeactivateObject(@PathVariable UUID objectId) {

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
    public ResponseEntity<?> BlockObject(@PathVariable UUID objectId) {

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
    public ResponseEntity<?> UnblockObject(@PathVariable UUID objectId) {

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
    public ResponseEntity<?> CheckObject(@PathVariable UUID objectId){

        try {
            objectService.FindById(objectId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
