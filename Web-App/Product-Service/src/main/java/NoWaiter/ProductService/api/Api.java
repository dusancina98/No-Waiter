package NoWaiter.ProductService.api;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import javax.validation.ConstraintViolationException;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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

import NoWaiter.ProductService.intercomm.AuthClient;
import NoWaiter.ProductService.intercomm.ObjectClient;
import NoWaiter.ProductService.intercomm.UserClient;
import NoWaiter.ProductService.services.contracts.ProductService;
import NoWaiter.ProductService.services.contracts.dto.IdentifiableDTO;
import NoWaiter.ProductService.services.contracts.dto.JwtParseResponseDTO;
import NoWaiter.ProductService.services.contracts.dto.NameDTO;
import NoWaiter.ProductService.services.contracts.dto.OrderItemsDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductRequestDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductUpdateRequestDTO;
import NoWaiter.ProductService.services.contracts.dto.ProductValidationResponseDTO;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidOrderItemException;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidProductCategoryException;
import NoWaiter.ProductService.services.contracts.exceptions.InvalidProductCategoryNameException;
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
	private UserClient userClient;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private Environment env;
	
	@GetMapping("/product-images/{imageName}")
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
	
	@PostMapping
	@CrossOrigin
	public ResponseEntity<?> createProduct(@RequestHeader("Authorization") String token,@RequestParam(value = "Image", required = false) MultipartFile Image,
										   @RequestParam("CategoryId") UUID CategoryId, @RequestParam("Name") String Name, @RequestParam("Description") String Description,
										   @RequestParam("Price") double Price, @RequestParam("MeasureUnit") String MeasureUnit, @RequestParam("Amount") int Amount,
										   @RequestParam("ProductTypeId") UUID ProductTypeId, @RequestParam("Ingredients") List<String> Ingredients,
										   @RequestParam("SideDishes") List<String> SideDishes) {
		try {
			
			ProductRequestDTO productDTO = new ProductRequestDTO(CategoryId, Name, Description, Price, MeasureUnit, Amount, ProductTypeId, Ingredients, SideDishes, Image);
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			
			return new ResponseEntity<>(productService.createProduct(productDTO, objectId), HttpStatus.CREATED);
		} catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (ConstraintViolationException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (InvalidProductCategoryException e) {
			e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}  
	
	@PutMapping
	@CrossOrigin
	public ResponseEntity<?> updateProduct(@RequestHeader("Authorization") String token, @RequestBody IdentifiableDTO<ProductUpdateRequestDTO> productDTO) {
		try {
			
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			productService.updateProduct(productDTO, objectId);
			
			return new ResponseEntity<>( HttpStatus.OK);
		} catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (ConstraintViolationException e) {
	        	e.printStackTrace();
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	    } catch (UnauthorizedRequestException e) {
        	e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
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
			UUID objectId;
			
			if (hasRole(jwtResponse.getAuthorities(), "ROLE_OBJADMIN")) {
				 objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			}else if(hasRole(jwtResponse.getAuthorities(), "ROLE_SELF_ORDER_PULT")) {
				 objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			}  else {
				objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			}

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
	
	@GetMapping("/{objectId}")
	@CrossOrigin
	public ResponseEntity<?> getAllProductsForCustomers(@PathVariable UUID objectId) {
		try {
			return new ResponseEntity<>(productService.findAllProductsForCustomer(objectId), HttpStatus.OK);
		} catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
	
	@DeleteMapping("/{productId}")
    @CrossOrigin
    public ResponseEntity<?> deleteProduct(@PathVariable UUID productId) {
        try {
        	productService.deleteProduct(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@DeleteMapping("/{categoryId}/category")
    @CrossOrigin
    public ResponseEntity<?> deleteCategory(@PathVariable UUID categoryId) {
        try {
        	productService.deleteCategory(categoryId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	private boolean hasRole(List<String> authorities, String role) {
		for (String auth : authorities) {
			if(auth.equals(role)) {
				return true;
			}
		}
		return false;
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
		} catch (InvalidProductCategoryNameException e) {
            return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
		}
		catch (FeignException e) {
        	if(e.status() == HttpStatus.NOT_FOUND.value())
                return new ResponseEntity<>("Object not found", HttpStatus.NOT_FOUND);
        	
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}  
	
	@PostMapping("/order-items/validate")
	@CrossOrigin
	public ResponseEntity<?> validateOrderItems(@RequestBody OrderItemsDTO items) {
		try {
			ProductValidationResponseDTO resp = productService.validateOrderItems(items);
			return new ResponseEntity<>(resp, HttpStatus.OK);
		} catch (InvalidOrderItemException e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Order items not valid", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>("Order items not valid", HttpStatus.BAD_REQUEST);
        }
	} 
	
	
	@GetMapping("/categories")
	@CrossOrigin
	public ResponseEntity<?> getProductCategories(@RequestHeader("Authorization") String token) {
		try {
			JwtParseResponseDTO jwtResponse = authClient.getLoggedUserInfo(token);
			UUID objectId;

			if (hasRole(jwtResponse.getAuthorities(), "ROLE_OBJADMIN")) {
				 objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			}else if(hasRole(jwtResponse.getAuthorities(), "ROLE_SELF_ORDER_PULT")) {
				 objectId = objectClient.getObjectIdByObjectAdminId(jwtResponse.getId());
			} else {
				objectId = userClient.findObjectIdByWaiterId(jwtResponse.getId());
			}
			System.out.println(objectId);

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
	
	@GetMapping("/categories/{objectId}")
	@CrossOrigin
	public ResponseEntity<?> getProductCategoriesForObject(@PathVariable UUID objectId) {
		try {
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
