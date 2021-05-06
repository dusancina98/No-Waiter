package NoWaiter.ObjectService.api;

import NoWaiter.ObjectService.services.contracts.ObjectService;
import NoWaiter.ObjectService.services.contracts.dto.ObjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/objects")
public class Api {

    @Autowired
    private ObjectService objectService;

    @PostMapping()
    @CrossOrigin
    public ResponseEntity<?> CreateObject(@RequestBody ObjectDTO objectDTO) {

        try {
            objectService.Create(objectDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> FindAllObjects() {

        try {
            return new ResponseEntity<>(objectService.FindAll(), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
