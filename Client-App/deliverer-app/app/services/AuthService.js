import { authConstants } from "../constants/AuthConstants";
import { deleteLocalStorage, setAuthInLocalStorage } from "../helpers/auth-header";
import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";

export const authService = {
	login,
	logout,
};

function login(loginRequest, dispatch) {
	dispatch(request());

	if (validateLoginRequest(loginRequest, dispatch)) {
		Axios.post(`${API_URL}/auth-api/api/auth/login`, loginRequest, { validateStatus: () => true })
			.then((res) => {
				if (res.status === 200) {
					setAuthInLocalStorage(res.data);
					dispatch(success(res.data));
				} else if (res.status === 401) {
					dispatch(failure(res.data.message));
				} else if (res.status === 403) {
					//window.location = "#/inactive-user/" + res.data;
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

function logout() {
	deleteLocalStorage();
}
