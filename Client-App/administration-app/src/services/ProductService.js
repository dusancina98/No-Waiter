import Axios from "axios";
import { productConstants } from "../constants/ProductConstants";
import { authHeader } from "../helpers/auth-header";

export const productService = {
	createProductCategory,
	findAllProductCategories,
	findAllProductTypes,

	createProduct,
};

function createProductCategory(categoryName, dispatch) {
	dispatch(request());

	Axios.post(`/product-api/api/products/categories`, { Name: categoryName }, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 201) {
				let category = { Id: res.data, EntityDTO: { Name: categoryName } };
				dispatch(success(category, "Table successfully added"));
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

function createProduct(productDTO, dispatch) {}
