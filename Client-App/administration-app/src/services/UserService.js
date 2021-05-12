import Axios from "axios";
import { config } from "../config/config";
import { userConstants } from "../constants/UserConstants";
import { setAuthInLocalStorage } from "../helpers/auth-header";

export const userService = {
	createObjectAdmin,
	findAllObjectAdmins,
	createWaiter,
	login,
};

function createObjectAdmin(objectAdmin, dispatch) {
	if (validateObjectAdmin(objectAdmin, dispatch)) {
		dispatch(request());

		Axios.post(`${config.API_URL}/user-api/api/users/object-admin`, objectAdmin, { validateStatus: () => true })
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
		return { type: userConstants.OBJECT_ADMIN_CREATE_REQUEST };
	}
	function success() {
		return { type: userConstants.OBJECT_ADMIN_CREATE_SUCCESS };
	}
	function failure(message) {
		return { type: userConstants.OBJECT_ADMIN_CREATE_FAILURE, errorMessage: message };
	}
}

function validateObjectAdmin(objectAdmin, dispatch) {
	if (objectAdmin.Name.length < 2) {
		dispatch(validatioFailure("Admin name must contain minimum two letters"));
		return false;
	} else if (objectAdmin.Surname.length < 2) {
		dispatch(validatioFailure("Admin surname must contain minimum two letters"));
		return false;
	} else if (objectAdmin.Address.length < 5) {
		dispatch(validatioFailure("Admin address must contain minimum five letters"));
		return false;
	} else if (objectAdmin.ObjectId === "") {
		dispatch(validatioFailure("Restaurant must be selected"));
		return false;
	}

	function validatioFailure(message) {
		return { type: userConstants.OBJECT_ADMIN_CREATE_FAILURE, errorMessage: message };
	}

	return true;
}

async function findAllObjectAdmins(dispatch) {
	dispatch(request());

	await Axios.get(`${config.API_URL}/user-api/api/users/object-admin`, { validateStatus: () => true })
		.then((res) => {
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
		return { type: userConstants.SET_OBJECT_ADMINS_REQUEST };
	}
	function success(data) {
		return { type: userConstants.SET_OBJECT_ADMINS_SUCCESS, objectAdmins: data };
	}
	function failure(message) {
		return { type: userConstants.SET_OBJECT_ADMINS_ERROR, errorMessage: message };
	}
}

function createWaiter(waiter, dispatch) {
	if (validateWaiter(waiter, dispatch)) {
		dispatch(request());

		Axios.post(`${config.API_URL}/user-api/api/users/employee/waiter`, waiter, { validateStatus: () => true })
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
		return { type: userConstants.WAITER_CREATE_REQUEST };
	}
	function success() {
		return { type: userConstants.WAITER_CREATE_SUCCESS };
	}
	function failure(message) {
		return { type: userConstants.WAITER_CREATE_FAILURE, errorMessage: message };
	}
}

function validateWaiter(waiter, dispatch) {
	if (waiter.Name.length < 2) {
		dispatch(validatioFailure("Waiter name must contain minimum two letters"));
		return false;
	} else if (waiter.Surname.length < 2) {
		dispatch(validatioFailure("Waiter surname must contain minimum two letters"));
		return false;
	} else if (waiter.Address.length < 5) {
		dispatch(validatioFailure("Waiter address must contain minimum five letters"));
		return false;
	}

	function validatioFailure(message) {
		return { type: userConstants.WAITER_CREATE_FAILURE, errorMessage: message };
	}

	return true;
}

function login(loginRequest, dispatch) {
	dispatch(request());

	Axios.post(`${config.API_URL}/auth-api/api/auth/login`, loginRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				setAuthInLocalStorage(res.data);
				dispatch(success());
				window.location = "#/";
			} else if (res.status === 401) {
				dispatch(failure(res.data.message));
			} else {
				dispatch({ type: userConstants.LOGIN_FAILURE });
			}
		})
		.catch((err) => console.error(err));

	function request() {
		return { type: userConstants.LOGIN_REQUEST };
	}
	function success() {
		return { type: userConstants.LOGIN_SUCCESS };
	}
	function failure(error) {
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}
