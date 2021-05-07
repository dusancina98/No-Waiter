package NoWaiter.ObjectService.api;

import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "api/objects")
public class Api {

    @Autowired
    private ObjectService objectService;

    @PostMapping()
    @CrossOrigin
    public ResponseEntity<?> CreateObject(@RequestBody ObjectDTO objectDTO) {

        try {
            UUID objectId = objectService.Create(objectDTO);
            return new ResponseEntity<>(objectId, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<?> FindAllObjects() {

        try {
            return new ResponseEntity<>(objectService.FindAll(), HttpStatus.OK);

        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkObject/{objectId}")
    @CrossOrigin
    public ResponseEntity<?> CheckObject(@PathVariable UUID objectId){

        try {
            IdentifiableDTO<ObjectDTO> objectDTO = objectService.FindById(objectId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
