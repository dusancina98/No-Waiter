import { authConstants } from "../constants/AuthConstants";
import { deleteLocalStorage, setAuthInLocalStorage } from "../helpers/auth-header";
import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";

export const authService = {
	login,
	logout,
	checkIfUserIdExist,
	resendActivationLinkRequest,
	resetPasswordLinkRequest,
};

function resetPasswordLinkRequest(resetPasswordLinkRequest, dispatch) {
	dispatch(request());

	Axios.post(`${API_URL}/user-api/api/users/reset-password-link-request`, resetPasswordLinkRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(resetPasswordLinkRequest.email));
			} else if (res.status === 404) {
				dispatch(failure("Sorry, your email was not found. Please double-check your email."));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: authConstants.RESET_PASSWORD_LINK_REQUEST };
	}
	function success(emailAddress) {
		return { type: authConstants.RESET_PASSWORD_LINK_SUCCESS, emailAddress };
	}
	function failure(error) {
		return { type: authConstants.RESET_PASSWORD_LINK_FAILURE, errorMessage: error };
	}
}

function checkIfUserIdExist(userId, dispatch) {
	Axios.get(`${API_URL}/user-api/api/users/check-existence/` + userId, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else if (res.status === 404) {
				dispatch(failure("User not found"));
			}
		})
		.catch((err) => {});

	function success(emailAddress) {
		return { type: authConstants.INACTIVE_USER_EMAIL_SUCCESS, emailAddress };
	}

	function failure(error) {
		return { type: authConstants.INACTIVE_USER_EMAIL_FAILURE, errorMessage: error };
	}
}

function resendActivationLinkRequest(userId, dispatch) {
	dispatch(request());
	Axios.post(`${API_URL}/user-api/api/users/activation-link-request`, userId, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 201) {
				dispatch(success());
			} else {
				dispatch(failure("Activation mail was not sent. Please, try again."));
			}
		})
		.catch((err) => {
			dispatch(failure("Activation mail was not sent. Please, try again."));
		});

	function request() {
		return { type: authConstants.RESEND_ACTIVATION_LINK_REQUEST };
	}
	function success() {
		return { type: authConstants.RESEND_ACTIVATION_LINK_SUCCESS };
	}
	function failure(error) {
		return { type: authConstants.RESEND_ACTIVATION_LINK_FAILURE, errorMessage: error };
	}
}

function login(loginRequest, dispatch) {
	dispatch(request());

	if (validateLoginRequest(loginRequest, dispatch)) {
		Axios.post(`${API_URL}/auth-api/api/auth/login/deliverer`, loginRequest, { validateStatus: () => true })
			.then((res) => {
				console.log(res.data);
				if (res.status === 200) {
					setAuthInLocalStorage(res.data);
					dispatch(success(res.data));
				} else if (res.status === 401) {
					dispatch(failure(res.data.message));
				} else if (res.status === 403) {
					//window.location = "#/inactive-user/" + res.data;
					dispatch(userUnactive(res.data));
				} else {
					dispatch(failure(res.data.message));
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function request() {
		return { type: authConstants.LOGIN_REQUEST };
	}
	function success() {
		return { type: authConstants.LOGIN_SUCCESS };
	}
	function failure(error) {
		return { type: authConstants.LOGIN_FAILURE, error };
	}
	function userUnactive(userId) {
		return { type: authConstants.LOGIN_USER_NOT_ACTIVE, userId };
	}
}

function validateLoginRequest(loginRequest, dispatch) {
	if (loginRequest.username === "") {
		dispatch(failure("Email address must be entered"));
		return false;
	} else if (loginRequest.password === "") {
		dispatch(failure("Password must be entered"));
		return false;
	}
	function failure(error) {
		return { type: authConstants.LOGIN_VALIDATION_FAILURE, error };
	}
	return true;
}

async function logout(dispatch) {
	await deleteLocalStorage();
	dispatch(success());

	function success() {
		return { type: authConstants.LOGOUT_SUCCESS };
	}
}
