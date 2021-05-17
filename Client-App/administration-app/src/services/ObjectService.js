import Axios from "axios";
import { objectConstants } from "../constants/ObjectConstants";

export const objectService = {
	createObject,
	updateObject,
	findAll,
	activateObject,
	deactivateObject,
	blockObject,
	unblockObject,
};

function createObject(object, dispatch) {
	if (validateObject(object, dispatch, objectConstants.OBJECT_CREATE_FAILURE)) {
		dispatch(request());

		Axios.post(`/object-api/api/objects`, object, { validateStatus: () => true })
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

function updateObject(object, dispatch) {
	let objectDTO = {
		Id: object.Id,
		EntityDTO: {
			Name: object.EntityDTO.Name,
			Email: object.EntityDTO.Email,
			PhoneNumber: object.EntityDTO.PhoneNumber,
			ImagePath: object.EntityDTO.ImagePath,
			Address: object.EntityDTO.Address,
		},
	};

	if (validateObject(object.EntityDTO, dispatch, objectConstants.OBJECT_UPDATE_FAILURE)) {
		dispatch(request());

		Axios.put(`/object-api/api/objects`, objectDTO, { validateStatus: () => true })
			.then((res) => {
				if (res.status === 200) {
					dispatch(success("Object successfully updated", object));
				} else {
					dispatch(failure(res.data.message));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function request() {
		return { type: objectConstants.OBJECT_UPDATE_REQUEST };
	}
	function success(message, object) {
		return { type: objectConstants.OBJECT_UPDATE_SUCCESS, successMessage: message, object };
	}
	function failure(message) {
		return { type: objectConstants.OBJECT_UPDATE_FAILURE, errorMessage: message };
	}
}

async function findAll(dispatch) {
	dispatch(request());

	await Axios.get(`/object-api/api/objects`, { validateStatus: () => true })
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

function validateObject(object, dispatch, type) {
	const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

	if (object.Name.length < 2) {
		dispatch(validatioFailure("Restaurant name must contain minimum two letters"));
		return false;
	} else if (phoneRegex.test(object.PhoneNumber) === true) {
		dispatch(validatioFailure("Invalid phone number"));
		return false;
	}

	function validatioFailure(message) {
		return { type, errorMessage: message };
	}

	return true;
}

function activateObject(object, dispatch) {
	dispatch(request());

	Axios.put(`/object-api/api/objects/${object.Id}/activate`, { validateStatus: () => true })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				object.EntityDTO.Active = true;
				dispatch(success("Object successfully activated", object));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: objectConstants.OBJECT_ACTIVATION_REQUEST };
	}
	function success(message, object) {
		return { type: objectConstants.OBJECT_ACTIVATION_SUCCESS, successMessage: message, object };
	}
	function failure(message) {
		return { type: objectConstants.OBJECT_ACTIVATION_FAILURE, errorMessage: message };
	}
}

function deactivateObject(object, dispatch) {
	dispatch(request());

	Axios.put(`/object-api/api/objects/${object.Id}/deactivate`, { validateStatus: () => true })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				object.EntityDTO.Active = false;
				dispatch(success("Object successfully deactivated", object));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: objectConstants.OBJECT_DEACTIVATION_REQUEST };
	}
	function success(message, object) {
		return { type: objectConstants.OBJECT_DEACTIVATION_SUCCESS, successMessage: message, object };
	}
	function failure(message) {
		return { type: objectConstants.OBJECT_DEACTIVATION_FAILURE, errorMessage: message };
	}
}

function blockObject(object, dispatch) {
	dispatch(request());

	Axios.put(`/object-api/api/objects/${object.Id}/block`, { validateStatus: () => true })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				object.EntityDTO.Blocked = true;
				dispatch(success("Object successfully blocked", object));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: objectConstants.OBJECT_BLOCKING_REQUEST };
	}
	function success(message, object) {
		return { type: objectConstants.OBJECT_BLOCKING_SUCCESS, successMessage: message, object };
	}
	function failure(message) {
		return { type: objectConstants.OBJECT_BLOCKING_FAILURE, errorMessage: message };
	}
}

function unblockObject(object, dispatch) {
	dispatch(request());

	Axios.put(`/object-api/api/objects/${object.Id}/unblock`, { validateStatus: () => true })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				object.EntityDTO.Blocked = false;
				dispatch(success("Object successfully unblocked", object));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: objectConstants.OBJECT_UNBLOCKING_REQUEST };
	}
	function success(message, object) {
		return { type: objectConstants.OBJECT_UNBLOCKING_SUCCESS, successMessage: message, object };
	}
	function failure(message) {
		return { type: objectConstants.OBJECT_UNBLOCKING_FAILURE, errorMessage: message };
	}
}
