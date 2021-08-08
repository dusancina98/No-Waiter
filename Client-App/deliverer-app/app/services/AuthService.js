import { authConstants } from "../constants/AuthConstants";
import { deleteLocalStorage, setAuthInLocalStorage } from "../helpers/auth-header";
import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";

export const authService = {
	login,
	logout,
	createEmploymentRequest,
};

function createEmploymentRequest(requestDTO, dispatch) {
	dispatch(request());

	if (validateEmploymentRequest(requestDTO, dispatch)) {
		Axios.post(`${API_URL}/user-api/api/users/deliverer-request`, requestDTO, { validateStatus: () => true })
			.then((res) => {
				console.log(res.data);
				if (res.status === 201) {
					dispatch(success(res.data));
				} else {
					dispatch(failure(res.data));
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function request() {
		return { type: authConstants.CREATE_EMPLOYMENT_REQUEST_REQUEST };
	}
	function success() {
		return { type: authConstants.CREATE_EMPLOYMENT_REQUEST_SUCCESS };
	}
	function failure(error) {
		return { type: authConstants.CREATE_EMPLOYMENT_REQUEST_FAILURE, error };
	}
}

function validateEmploymentRequest(requestDTO, dispatch) {
	if (requestDTO.Email === "") {
		dispatch(failure("Email address must be entered"));
		return false;
	} else if (requestDTO.Name === "") {
		dispatch(failure("Name must be entered"));
		return false;
	} else if (requestDTO.Surname === "") {
		dispatch(failure("Surname must be entered"));
		return false;
	} else if (requestDTO.PhoneNumber === "") {
		dispatch(failure("PhoneNumber must be entered"));
		return false;
	} else if (requestDTO.Reference === "") {
		dispatch(failure("Reference must be entered"));
		return false;
	}
	function failure(error) {
		return { type: authConstants.CREATE_EMPLOYMENT_REQUEST_VALIDATION_FAILURE, error };
	}
	return true;
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
					dispatch(failure(res.data.message));
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

async function logout(dispatch) {
	await deleteLocalStorage();
	dispatch(success());

	function success() {
		return { type: authConstants.LOGOUT_SUCCESS };
	}
}
