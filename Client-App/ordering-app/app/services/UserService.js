import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { userConstants } from "../constants/UserConstants";
import { authHeader, setNameAndSurname } from "../helpers/auth-header";

export const userService = {
	registration,
	getUserProfile,
	editProfile,
	getUserAddresses,
	addUserAddress,
	removeUserAddress,
};

async function removeUserAddress(addressId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.delete(`${API_URL}/user-api/api/users/customer/address/${addressId}`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(addressId));
			} else {
				dispatch(failure("Error while removing address"));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: userConstants.REMOVE_USER_ADDRESS_REQUEST };
	}
	function success(addressId) {
		return { type: userConstants.REMOVE_USER_ADDRESS_SUCCESS, addressId };
	}
	function failure(error) {
		return { type: userConstants.REMOVE_USER_ADDRESS_FAILURE, error };
	}
}

async function addUserAddress(addressDTO, dispatch) {
	dispatch(request());

	let header = await authHeader();

	if (addressDTO.Name !== "") {
		Axios.post(`${API_URL}/user-api/api/users/customer/address`, addressDTO, { validateStatus: () => true, headers: header })
			.then((res) => {
				console.log(res.data);
				if (res.status === 201) {
					dispatch(success({ Id: res.data, EntityDTO: { Name: addressDTO.Name } }));
				} else {
					dispatch(failure("Error while adding new address"));
				}
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
	}

	function request() {
		return { type: userConstants.ADD_USER_ADDRESS_REQUEST };
	}
	function success(address) {
		return { type: userConstants.ADD_USER_ADDRESS_SUCCESS, address };
	}
	function failure(error) {
		return { type: userConstants.ADD_USER_ADDRESS_FAILURE, error };
	}
}

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

async function getUserAddresses(dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.get(`${API_URL}/user-api/api/users/customer/addresses`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error while getting user addresses"));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: userConstants.SET_USER_ADDRESSES_REQUEST };
	}
	function success(addresses) {
		return { type: userConstants.SET_USER_ADDRESSES_SUCCESS, addresses };
	}
	function failure(error) {
		return { type: userConstants.SET_USER_ADDRESSES_FAILURE, error };
	}
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
