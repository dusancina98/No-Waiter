import Axios from "axios";
import { objectConstants } from "../constants/ObjectConstants";
import { authHeader } from "../helpers/auth-header";

export const objectService = {
	createObject,
	updateObject,
	updateObjectImage,
	findAll,
	findByAdminId,
	activateObject,
	deactivateObject,
	blockObject,
	unblockObject,
	generateNewToken,
};

function createObject(object, dispatch) {
	if (validateObject(object, dispatch, objectConstants.OBJECT_CREATE_FAILURE)) {
		dispatch(request());

		Axios.post(`/object-api/api/objects`, object, { validateStatus: () => true, headers: authHeader() })
			.then((res) => {
				if (res.status === 201) {
					dispatch(success());
				} else if(res.status===409){
					dispatch(failure("Restaurant with name " + object.Name +" already exist, please enter unique name"));
				}else{
					dispatch(failure(res.data));
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

		Axios.put(`/object-api/api/objects`, objectDTO, { validateStatus: () => true, headers: authHeader() })
			.then((res) => {
				if (res.status === 200) {
					dispatch(success("Object successfully updated", object));
				}else if(res.status===409){
					dispatch(failure("Restaurant with name " + object.Name +" already exist, please enter unique name"));
				}else{
					dispatch(failure(res.data));
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

function updateObjectImage(image, dispatch) {
	dispatch(request());

	Axios.put(`/object-api/api/objects/image`, image, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success("Object image updated successfully"));
			} else {
				dispatch(failure(res.data.message));
			}
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: objectConstants.OBJECT_IMAGE_CHANGE_REQUEST };
	}
	function success(message) {
		return { type: objectConstants.OBJECT_IMAGE_CHANGE_SUCCESS, successMessage: message };
	}
	function failure(message) {
		return { type: objectConstants.OBJECT_IMAGE_CHANGE_FAILURE, errorMessage: message };
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

async function findByAdminId(dispatch) {
	dispatch(request());

	await Axios.get(`/object-api/api/objects/admin`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			res.data.EntityDTO.ImagePath = res.data.EntityDTO.ImagePath.replace("\\", "/");
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
		return { type: objectConstants.OBJECT_INFO_REQUEST };
	}
	function success(data) {
		return { type: objectConstants.OBJECT_INFO_SUCCESS, objectInfo: data };
	}
	function failure(message) {
		return { type: objectConstants.OBJECT_INFO_FAILURE, errorMessage: message };
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

	Axios.put(`/object-api/api/objects/${object.Id}/activate`, null,  { validateStatus: () => true, headers: authHeader() })
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

	Axios.put(`/object-api/api/objects/${object.Id}/deactivate`,null,  { validateStatus: () => true, headers: authHeader() })
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

	Axios.put(`/object-api/api/objects/${object.Id}/block`, null, { validateStatus: () => true, headers: authHeader() })
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

	Axios.put(`/object-api/api/objects/${object.Id}/unblock`, null, { validateStatus: () => true, headers: authHeader() })
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

function generateNewToken(dispatch) {

	Axios.post(`/object-api/api/objects/self-ordering-jwt`, null, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 201) {
				dispatch(success(res.data));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.log(err);
		});
	
		function success(jwtToken) {
			return { type: objectConstants.GENERATE_SELF_ORDERING_TOKEN_SUCCESS,jwtToken };
		}
		function failure(message) {
			return { type: objectConstants.GENERATE_SELF_ORDERING_TOKEN_FAILURE, errorMessage: message };
		}
}