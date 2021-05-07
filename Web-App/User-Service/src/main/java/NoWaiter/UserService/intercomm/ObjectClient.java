package NoWaiter.UserService.intercomm;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import NoWaiter.UserService.services.contracts.dto.AddAdminDTO;

@FeignClient("object-service")
public interface ObjectClient {

    @GetMapping("api/objects/checkObject/{objectId}")
    boolean checkObject(@PathVariable("objectId") UUID objectId);
    
    @PostMapping("api/objects/admin")
    void addAdminToObject(@RequestBody AddAdminDTO addAdminDTO);
}
