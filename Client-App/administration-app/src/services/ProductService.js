import Axios from "axios";
import { pathConstants } from "../constants/PathConstants";
import { productConstants } from "../constants/ProductConstants";
import { authHeader } from "../helpers/auth-header";

export const productService = {
	createProductCategory,
	findAllProductCategories,
	findAllProductTypes,
	createProduct,
	updateProduct,
	updateProductImage,
	findAllProducts,
	deleteProduct,
};

function createProductCategory(categoryName, dispatch) {
	dispatch(request());

	Axios.post(`/product-api/api/products/categories`, { Name: categoryName }, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 201) {
				let category = { Id: res.data, EntityDTO: { Name: categoryName } };
				dispatch(success(category, "Table successfully added"));
			} else if(res.status === 400){
				dispatch(failure("Category with this name already exist"));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: productConstants.CATEGORY_CREATE_REQUEST };
	}
	function success(category, message) {
		return { type: productConstants.CATEGORY_CREATE_SUCCESS, category, successMessage: message };
	}
	function failure(message) {
		return { type: productConstants.CATEGORY_CREATE_FAILURE, errorMessage: message };
	}
}

function updateProductImage(productId, image, imageUrl, dispatch) {
	dispatch(request());

	Axios.put(`/product-api/api/products/${productId}/image`, image, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success("Product image updated successfully", productId, imageUrl));
			} else {
				dispatch(failure(res.data.message));
			}
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: productConstants.PRODUCT_IMAGE_CHANGE_REQUEST };
	}
	function success(message, productId, imageUrl) {
		return { type: productConstants.PRODUCT_IMAGE_CHANGE_SUCCESS, successMessage: message, productId, imageUrl };
	}
	function failure(message) {
		return { type: productConstants.PRODUCT_IMAGE_CHANGE_FAILURE, errorMessage: message };
	}
}

async function findAllProductCategories(dispatch) {
	dispatch(request());

	await Axios.get(`/product-api/api/products/categories`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: productConstants.SET_CATEGORIES_REQUEST };
	}
	function success(data) {
		return { type: productConstants.SET_CATEGORIES_SUCCESS, categories: data };
	}
	function failure(message) {
		return { type: productConstants.SET_CATEGORIES_ERROR, errorMessage: message };
	}
}

async function findAllProductTypes(dispatch) {
	dispatch(request());

	await Axios.get(`/product-api/api/products/types`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: productConstants.SET_PRODUCT_TYPES_REQUEST };
	}
	function success(data) {
		return { type: productConstants.SET_PRODUCT_TYPES_SUCCESS, productTypes: data };
	}
	function failure(message) {
		return { type: productConstants.SET_PRODUCT_TYPES_ERROR, errorMessage: message };
	}
}

function createProduct(productDTO, dispatch) {
	let ingredients = [...productDTO.Ingredients];
	let sideDishes = [...productDTO.SideDishes];

	const formData = fetchFormData(productDTO);
	dispatch(request());

	if (validateProduct(productDTO, dispatch, productConstants.PRODUCT_CREATE_FAILURE)) {
		Axios.post(`/product-api/api/products`, formData, { validateStatus: () => true, headers: authHeader() })
			.then((res) => {
				if (res.status === 201) {
					let product = { Id: res.data, EntityDTO: productDTO };
					product.EntityDTO.Ingredients = ingredients;
					product.EntityDTO.Image = productDTO.Image === "" ? "" : pathConstants.PRODUCT_IMAGES_PATH + res.data + ".jpg";
					product.EntityDTO.SideDishes = sideDishes;
					dispatch(success(product, "Product successfully added"));
				} else {
					dispatch(failure(res.data.message));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function request() {
		return { type: productConstants.PRODUCT_CREATE_REQUEST };
	}
	function success(product, message) {
		return { type: productConstants.PRODUCT_CREATE_SUCCESS, product, successMessage: message };
	}
	function failure(message) {
		return { type: productConstants.PRODUCT_CREATE_FAILURE, errorMessage: message };
	}
}

function updateProduct(productDTO, dispatch) {
	let ingredients = [...productDTO.EntityDTO.Ingredients];
	let sideDishes = [...productDTO.EntityDTO.SideDishes];
	productDTO.EntityDTO.Ingredients = [];
	productDTO.EntityDTO.SideDishes = [];
	ingredients.forEach((ingredient) => {
		productDTO.EntityDTO.Ingredients.push(ingredient.EntityDTO.Name);
	});
	sideDishes.forEach((sideDish) => {
		productDTO.EntityDTO.SideDishes.push(sideDish.EntityDTO.Name);
	});
	dispatch(request());

	if (validateProduct(productDTO.EntityDTO, dispatch, productConstants.PRODUCT_CREATE_FAILURE)) {
		Axios.put(`/product-api/api/products`, productDTO, { validateStatus: () => true, headers: authHeader() })
			.then((res) => {
				if (res.status === 200) {
					let product = productDTO;
					product.EntityDTO.Ingredients = ingredients;
					product.EntityDTO.SideDishes = sideDishes;

					dispatch(success(product, "Product successfully updated"));
				} else {
					dispatch(failure(res.data.message));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function request() {
		return { type: productConstants.PRODUCT_UPDATE_REQUEST };
	}
	function success(product, message) {
		return { type: productConstants.PRODUCT_UPDATE_SUCCESS, product, successMessage: message };
	}
	function failure(message) {
		return { type: productConstants.PRODUCT_UPDATE_FAILURE, errorMessage: message };
	}
}

function fetchFormData(productDTO) {
	let ingredients = [...productDTO.Ingredients];
	let sideDishes = [...productDTO.SideDishes];
	productDTO.Ingredients = [];
	productDTO.SideDishes = [];
	ingredients.forEach((ingredient) => {
		productDTO.Ingredients.push(ingredient.EntityDTO.Name);
	});
	sideDishes.forEach((sideDish) => {
		productDTO.SideDishes.push(sideDish.EntityDTO.Name);
	});
	let formData = new FormData();

	if (productDTO.Image !== "") {
		formData.append("Image", productDTO.Image, "img");
	} else {
		formData.append("Image", null);
	}
	formData.append("Name", productDTO.Name);
	formData.append("MeasureUnit", productDTO.MeasureUnit);
	formData.append("Amount", productDTO.Amount);
	formData.append("Price", productDTO.Price);
	formData.append("ProductTypeId", productDTO.ProductTypeId);
	formData.append("Description", productDTO.Description);
	formData.append("Ingredients", productDTO.Ingredients);
	formData.append("SideDishes", productDTO.SideDishes);
	formData.append("CategoryId", productDTO.CategoryId);
	return formData;
}
async function findAllProducts(dispatch) {
	dispatch(request());

	await Axios.get(`/product-api/api/products`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: productConstants.SET_PRODUCTS_REQUEST };
	}
	function success(data) {
		return { type: productConstants.SET_PRODUCTS_SUCCESS, products: data };
	}
	function failure(message) {
		return { type: productConstants.SET_PRODUCTS_FAILURE, errorMessage: message };
	}
}

function validateProduct(product, dispatch, type) {
	console.log(product);

	if (product.MeasureUnit === "") {
		dispatch(validatioFailure("Measurement unit must be entered"));
		return false;
	} else if (product.ProductTypeId === "") {
		dispatch(validatioFailure("Product type must be selected"));
		return false;
	} else if (product.Ingredients.length === 0 && product.ProductTypeId === "833200ce-bce5-11eb-8529-0242ac130003") {
		dispatch(validatioFailure("Product must have at least one ingredient"));
		return false;
	}

	function validatioFailure(message) {
		return { type, errorMessage: message };
	}

	return true;
}

function deleteProduct(productId, dispatch) {
	Axios.delete(`/product-api/api/products/${productId}`,  { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				dispatch(success("Product successfully deleted", productId));
			} else {
				dispatch(failure("Unable to delete object"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function success(message, productId) {
		return { type: productConstants.PRODUCT_DELETE_SUCCESS, successMessage: message, productId };
	}
	function failure(message) {
		return { type: productConstants.PRODUCT_DELETE_FAILURE, errorMessage: message };
	}
}