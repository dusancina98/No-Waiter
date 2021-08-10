import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { userConstants } from "../constants/UserConstants";
import { authHeader, setNameAndSurname } from "../helpers/auth-header";

export const userService = {
	registration,
	getUserProfile,
	editProfile,
};

async function editProfile(editDTO, dispatch) {
	dispatch(request());

	let header = await authHeader();

	if (validateProfileEdit(editDTO, dispatch)) {
		Axios.put(`${API_URL}/user-api/api/users/customer`, editDTO, { validateStatus: () => true, headers: header })
			.then((res) => {
				console.log(res.data);
				if (res.status === 200) {
					dispatch(success());
					setNameAndSurname(editDTO.Name, editDTO.Surname);
				} else {
					dispatch(failure("Error while updating profile information"));
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function request() {
		return { type: userConstants.EDIT_USER_PROFILE_REQUEST };
	}
	function success() {
		return { type: userConstants.EDIT_USER_PROFILE_SUCCESS };
	}
	function failure(error) {
		return { type: userConstants.EDIT_USER_PROFILE_FAILURE, error };
	}
}

function validateProfileEdit(requestDTO, dispatch) {
	if (requestDTO.Name === "") {
		dispatch(failure("Name must be entered"));
		return false;
	} else if (requestDTO.Surname === "") {
		dispatch(failure("Surname must be entered"));
		return false;
	} else if (requestDTO.PhoneNumber === "") {
		dispatch(failure("Phone Number must be entered"));
		return false;
	}
	function failure(error) {
		return { type: userConstants.EDIT_USER_PROFILE_FAILURE, error };
	}
	return true;
}

async function getUserProfile(dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.get(`${API_URL}/user-api/api/users/customer/info`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error while getting user data"));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: userConstants.USER_PROFILE_REQUEST };
	}
	function success(user) {
		return { type: userConstants.USER_PROFILE_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.USER_PROFILE_FAILURE, error };
	}
}

function registration(requestDTO, dispatch) {
	dispatch(request());

	if (validateRegistrationRequest(requestDTO, dispatch)) {
		Axios.post(`${API_URL}/user-api/api/users/customer`, requestDTO, { validateStatus: () => true })
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
		return { type: userConstants.REGISTRATION_REQUEST };
	}
	function success() {
		return { type: userConstants.REGISTRATION_SUCCESS };
	}
	function failure(error) {
		return { type: userConstants.REGISTRATION_FAILURE, error };
	}
}

function validateRegistrationRequest(requestDTO, dispatch) {
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
		dispatch(failure("Phone Number must be entered"));
		return false;
	} else if (requestDTO.Address === "") {
		dispatch(failure("Address must be entered"));
		return false;
	}
	function failure(error) {
		return { type: userConstants.REGISTRATION_FAILURE, error };
	}
	return true;
}
