import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { productConstants } from "../constants/ProductConstants";
import { authHeader } from "../helpers/auth-header";

export const productService = {
	getObjectCategories,
	getObjectProducts,
};

async function getObjectCategories(objectId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	await Axios.get(`${API_URL}/product-api/api/products/categories/${objectId}`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("We have some problem"));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: productConstants.GET_OBJECT_CATEGORIES_REQUEST };
	}
	function success(categories) {
		return { type: productConstants.GET_OBJECT_CATEGORIES_SUCCESS, categories };
	}
	function failure(error) {
		return { type: productConstants.GET_OBJECT_CATEGORIES_FAILURE, error };
	}
}

async function getObjectProducts(objectId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	await Axios.get(`${API_URL}/product-api/api/products/${objectId}`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("We have some problem"));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: productConstants.GET_OBJECT_PRODUCTS_REQUEST };
	}
	function success(products) {
		return { type: productConstants.GET_OBJECT_PRODUCTS_SUCCESS, products };
	}
	function failure(error) {
		return { type: productConstants.GET_OBJECT_PRODUCTS_FAILURE, error };
	}
}
