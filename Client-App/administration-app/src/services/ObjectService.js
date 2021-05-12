import Axios from "axios";
import { config } from "../config/config";
import { objectConstants } from "../constants/ObjectConstants";

export const objectService = {
	createObject,
	findAll,
};

function createObject(object, dispatch) {
	if (validateObject(object, dispatch)) {
		dispatch(request());

		Axios.post(`${config.API_URL}/object-api/api/objects`, object, { validateStatus: () => true,
		})
			.then((res) => {
				if (res.status === 201) {
					dispatch(success());
				} else {
					dispatch(failure(res.data.message));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function request() {
		return { type: objectConstants.OBJECT_CREATE_REQUEST };
	}
	function success() {
		return { type: objectConstants.OBJECT_CREATE_SUCCESS };
	}
	function failure(message) {
		return { type: objectConstants.OBJECT_CREATE_FAILURE, errorMessage: message };
	}
}

async function findAll(dispatch) {
	dispatch(request());

	await Axios.get(`${config.API_URL}/object-api/api/objects`, { validateStatus: () => true })
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
		return { type: objectConstants.SET_OBJECTS_REQUEST };
	}
	function success(data) {
		return { type: objectConstants.SET_OBJECTS_SUCCESS, objects: data };
	}
	function failure(message) {
		return { type: objectConstants.SET_OBJECTS_ERROR, errorMessage: message };
	}
}

function validateObject(object, dispatch) {
	const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

	if (object.Name.length < 2) {
		dispatch(validatioFailure("Restaurant name must contain minimum two letters"));
		return false;
	} else if (phoneRegex.test(object.PhoneNumber) === true) {
		dispatch(validatioFailure("Invalid phone number"));
		return false;
	}

	function validatioFailure(message) {
		return { type: objectConstants.OBJECT_CREATE_FAILURE, errorMessage: message };
	}

	return true;
}