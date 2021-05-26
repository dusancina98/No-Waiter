package NoWaiter.ProductService.api;

import java.util.List;
import java.util.NoSuchElementException;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import NoWaiter.ProductService.intercomm.AuthClient;
import NoWaiter.ProductService.intercomm.ObjectClient;
import NoWaiter.ProductService.services.contracts.ProductService;
import NoWaiter.ProductService.services.contracts.dto.JwtParseResponseDTO;
import NoWaiter.ProductService.services.contracts.dto.NameDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductRequestDTO;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidProductCategoryException;
import NoWaiter.ProductService.services.contracts.exceptions.UnauthorizedRequestException;
import feign.FeignException;


@RestController
@RequestMapping(value = "api/products")
public class Api {

	@Autowired
	private AuthClient authClient;
	
	@Autowired
	private ObjectClient objectClient;
	
	@Autowired
	private ProductService productService;
	
	
	@PostMapping
	@CrossOrigin
	public ResponseEntity<?> createProduct(@RequestHeader("Authorization") String token,@RequestParam(value = "Image", required = false) MultipartFile Image, @RequestParam("CategoryId") UUID CategoryId, @RequestParam("Name") String Name
			, @RequestParam("Description") String Description, @RequestParam("Price") double Price, @RequestParam("MeasureUnit") String MeasureUnit,
			@RequestParam("Amount") int Amount, @RequestParam("ProductTypeId") UUID ProductTypeId, @RequestParam("Ingredients") List<String> Ingredients, @RequestParam("SideDishes") List<String> SideDishes) {
		try {
			ProductRequestDTO productDTO = new ProductRequestDTO(CategoryId, Name, Description, Price, MeasureUnit, Amount, ProductTypeId, Ingredients, SideDishes, Image);
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			return new ResponseEntity<>(productService.createProduct(productDTO, objectId), HttpStatus.CREATED);
		} catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (InvalidProductCategoryException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}  
	
	@GetMapping
	@CrossOrigin
	public ResponseEntity<?> getProducts(@RequestHeader("Authorization") String token) {
		try {
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			return new ResponseEntity<>(productService.findAllProducts(objectId), HttpStatus.OK);
		} catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
	
	@PutMapping("/{productId}/image")
    @CrossOrigin
    public ResponseEntity<?> updateObjectImage(@RequestHeader("Authorization") String token, @RequestParam("image") MultipartFile multipartFile, @PathVariable UUID productId) {

        try {
        	JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			productService.updateImage(multipartFile, productId, objectId);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NoSuchElementException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Entity not found", HttpStatus.NOT_FOUND);
        } catch (UnauthorizedRequestException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PostMapping("/categories")
	@CrossOrigin
	public ResponseEntity<?> createProductCategory(@RequestHeader("Authorization") String token, @RequestBody NameDTO categoryDTO) {
		try {
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			return new ResponseEntity<>(productService.createProductCategory(categoryDTO, objectId), HttpStatus.CREATED);
		} catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}  
	
	@GetMapping("/categories")
	@CrossOrigin
	public ResponseEntity<?> getProductCategories(@RequestHeader("Authorization") String token) {
		try {
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			return new ResponseEntity<>(productService.findAllProductCategories(objectId), HttpStatus.OK);
		} catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}  
	
	@GetMapping("/types")
	@CrossOrigin
	public ResponseEntity<?> getProductTypes() {
		try {
			return new ResponseEntity<>(productService.findAllProductTypes(), HttpStatus.OK);
		}  catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}  

}
