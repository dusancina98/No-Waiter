import Axios from "axios";
import { authHeader } from "../helpers/auth-header";
import { productConstants } from "../constants/ProductConstants";

export const productService = {
	findAllProducts,
	findAllProductCategories,
};

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