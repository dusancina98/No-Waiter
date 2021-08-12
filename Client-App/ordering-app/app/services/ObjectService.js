import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { objectConstants } from "../constants/ObjectConstants";

export const objectService = {
	findAllObjects,
	getObjectDetails,
	getObjectCategories,
	getObjectProducts,
};

function findAllObjects(dispatch) {
	dispatch(request());

	Axios.get(`${API_URL}/object-api/api/objects/customers`, { validateStatus: () => true })
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
		return { type: objectConstants.FIND_ALL_OBJECTS_REQUEST };
	}
	function success(objects) {
		return { type: objectConstants.FIND_ALL_OBJECTS_SUCCESS, objects };
	}
	function failure(error) {
		return { type: objectConstants.FIND_ALL_OBJECTS_FAILURE, error };
	}
}

function getObjectDetails(objectId, dispatch) {
	dispatch(request());

	Axios.get(`${API_URL}/object-api/api/objects/customers/${objectId}`, { validateStatus: () => true })
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
		return { type: objectConstants.GET_OBJECT_DETAILS_REQUEST };
	}
	function success(object) {
		return { type: objectConstants.GET_OBJECT_DETAILS_SUCCESS, object };
	}
	function failure(error) {
		return { type: objectConstants.GET_OBJECT_DETAILS_FAILURE, error };
	}
}

function getObjectCategories(objectId, dispatch) {
	dispatch(request());

	Axios.get(`${API_URL}/product-api/api/products/categories/${objectId}`, { validateStatus: () => true })
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
		return { type: objectConstants.GET_OBJECT_CATEGORIES_REQUEST };
	}
	function success(categories) {
		return { type: objectConstants.GET_OBJECT_CATEGORIES_SUCCESS, categories };
	}
	function failure(error) {
		return { type: objectConstants.GET_OBJECT_CATEGORIES_FAILURE, error };
	}
}

function getObjectProducts(objectId, dispatch) {
	dispatch(request());

	Axios.get(`${API_URL}/product-api/api/products/${objectId}`, { validateStatus: () => true })
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
		return { type: objectConstants.GET_OBJECT_PRODUCTS_REQUEST };
	}
	function success(products) {
		return { type: objectConstants.GET_OBJECT_PRODUCTS_SUCCESS, products };
	}
	function failure(error) {
		return { type: objectConstants.GET_OBJECT_PRODUCTS_FAILURE, error };
	}
}

