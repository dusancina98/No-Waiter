import Axios from "axios";
import { config } from "../config/config";
import { userConstants } from "../constants/UserConstants";
import { setAuthInLocalStorage } from "../helpers/auth-header";

export const userService = {
	createObjectAdmin,
	findAllObjectAdmins,
	login,
	checkIfUserIdExist,
	resendActivationLinkRequest,
	changeFirstPassword,

};

function createObjectAdmin(objectAdmin, dispatch) {
	if (validateObjectAdmin(objectAdmin, dispatch)) {
		dispatch(request());

		Axios.post(`${config.API_URL}/user-api/api/users/object-admin`, objectAdmin, { validateStatus: () => true ,
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
			}else if (res.status === 403) {
				window.location = "#/inactive-user/" + res.data;
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

function checkIfUserIdExist(userId, dispatch) {
	Axios.get(`${config.API_URL}/user-api/api/users/check-existence/` + userId, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else if (res.status === 404) {
				window.location = "#/404";
			}
		})
		.catch((err) => {});

	function success(emailAddress) {
		return { type: userConstants.INACTIVE_USER_EMAIL_REQUEST, emailAddress };
	}
}

function resendActivationLinkRequest(userId, dispatch){
	dispatch(request());
	Axios.post(`${config.API_URL}/user-api/api/users/activation-link-request`, userId, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 201) {
				dispatch(success());
			} else {
				dispatch(failure("Activation mail was not sent. Please, try again."));
			}
		})
		.catch((err) => {
			dispatch(failure("Activation mail was not sent. Please, try again."))
		});

	function request() {
		return { type: userConstants.RESEND_ACTIVATION_LINK_REQUEST };
	}
	function success() {
		return { type: userConstants.RESEND_ACTIVATION_LINK_SUCCESS };
	}
	function failure(error) {
		return { type: userConstants.RESEND_ACTIVATION_LINK_FAILURE, errorMessage: error };
	}
}

function changeFirstPassword(changePasswordRequest, dispatch){
	let [passwordValid, passwordErrorMessage] = validatePasswords(changePasswordRequest.password, changePasswordRequest.repeatedPassword);

	if (passwordValid === true) {
		dispatch(request());

		Axios.post(`${config.API_URL}/user-api/api/users/change-first-password`, changePasswordRequest, { validateStatus: () => true })
			.then((res) => {
				if (res.status === 200) {
					dispatch(success());
				} else {
					console.log(res);
					dispatch(failure(res.data.message));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		dispatch(failure(passwordErrorMessage));
	}

	function request() {
		return { type: userConstants.FIRST_ACTIVATION_PASSWORD_CHANGE_REQUEST };
	}
	function success() {
		return { type: userConstants.FIRST_ACTIVATION_PASSWORD_CHANGE_SUCCESS };
	}
	function failure(error) {
		return { type: userConstants.FIRST_ACTIVATION_PASSWORD_CHANGE_FAILURE, errorMessage: error };
	}
}

function validatePasswords(password, repeatedPassword) {
	const regexPassword = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[^!@#$%^&*(),.?":{}|<>~'_+=]*)$/;

	if (regexPassword.test(password) === true) {
		return [false, "Password must contain minimum eight characters, at least one capital letter, one number and one special character."];
	} else if (password !== repeatedPassword) {
		return [false, "Passwords must be the same."];
	} else {
		return [true, ""];
	}
}

