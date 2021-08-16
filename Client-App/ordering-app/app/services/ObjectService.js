import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { objectConstants } from "../constants/ObjectConstants";
import { authHeader } from "../helpers/auth-header";

export const objectService = {
	findAllObjects,
	findFavouriteObjects,
	getObjectDetails,
	getObjectCategories,
	getObjectProducts,
	addObjectToFavourites,
	removeObjectFromFavourites,
};

async function addObjectToFavourites(objectId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	await Axios.put(`${API_URL}/user-api/api/users/customer/objects/favourite/${objectId}`, null, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(objectId));
			} else {
				dispatch(failure("We have some problem"));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: objectConstants.ADD_OBJECT_TO_FAVOURITES_REQUEST };
	}
	function success(objectId) {
		return { type: objectConstants.ADD_OBJECT_TO_FAVOURITES_SUCCESS, objectId };
	}
	function failure(error) {
		return { type: objectConstants.ADD_OBJECT_TO_FAVOURITES_FAILURE, error };
	}
}

async function removeObjectFromFavourites(objectId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	await Axios.delete(`${API_URL}/user-api/api/users/customer/objects/favourite/${objectId}`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(objectId));
			} else {
				dispatch(failure("We have some problem"));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: objectConstants.REMOVE_OBJECT_FROM_FAVOURITES_REQUEST };
	}
	function success(objectId) {
		return { type: objectConstants.REMOVE_OBJECT_FROM_FAVOURITES_SUCCESS, objectId };
	}
	function failure(error) {
		return { type: objectConstants.REMOVE_OBJECT_FROM_FAVOURITES_FAILURE, error };
	}
}

async function findFavouriteObjects(dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.get(`${API_URL}/object-api/api/objects/customers/favourites`, { validateStatus: () => true, headers: header })
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
		return { type: objectConstants.FIND_FAVOURITE_OBJECTS_REQUEST };
	}
	function success(objects) {
		return { type: objectConstants.FIND_FAVOURITE_OBJECTS_SUCCESS, objects };
	}
	function failure(error) {
		return { type: objectConstants.FIND_FAVOURITE_OBJECTS_FAILURE, error };
	}
}

async function findAllObjects(dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.get(`${API_URL}/object-api/api/objects/customers`, { validateStatus: () => true, headers: header })
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

async function getObjectDetails(objectId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	await Axios.get(`${API_URL}/object-api/api/objects/customers/${objectId}`, { validateStatus: () => true, headers: header })
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

async function getObjectCategories(objectId, dispatch) {
	dispatch(request());

	await Axios.get(`${API_URL}/product-api/api/products/categories/${objectId}`, { validateStatus: () => true })
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

async function getObjectProducts(objectId, dispatch) {
	dispatch(request());

	await Axios.get(`${API_URL}/product-api/api/products/${objectId}`, { validateStatus: () => true })
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
