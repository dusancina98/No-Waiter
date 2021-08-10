import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { userConstants } from "../constants/UserConstants";

export const userService = {
	registration,
};

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
