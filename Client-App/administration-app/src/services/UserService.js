import Axios from "axios";
import { authHeader, deleteLocalStorage } from "../helpers/auth-header";
import { userConstants } from "../constants/UserConstants";
import { setAuthInLocalStorage } from "../helpers/auth-header";

export const userService = {
	createObjectAdmin,
	updateObjectAdmin,
	deleteObjectAdmin,
	findAllObjectAdmins,
	createWaiter,
	updateWaiter,
	findAllWaiters,
	login,
	logout,
	checkIfUserIdExist,
	resendActivationLinkRequest,
	changeFirstPassword,
	resetPasswordLinkRequest,
	resetPassword,
	checkIfActivationTokenIsValid,
	checkIfResetPasswordTokenIsValid,
	findAllDelivererRequests,
	approveDelivererRequest,
	rejectDelivererRequest,
	findAllDeliverer,
	activateDeliverer,
	deactivateDeliverer,
	deleteDeliverer,
};

function createObjectAdmin(objectAdmin, dispatch) {
	if (validateObjectAdmin(objectAdmin, dispatch, userConstants.OBJECT_ADMIN_CREATE_FAILURE)) {
		dispatch(request());

		Axios.post(`/user-api/api/users/object-admin`, objectAdmin, { validateStatus: () => true, headers: authHeader() })
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

function updateObjectAdmin(objectAdmin, dispatch) {
	let objectAdminDTO = {
		Id: objectAdmin.Id,
		EntityDTO: { Name: objectAdmin.EntityDTO.Name, Surname: objectAdmin.EntityDTO.Surname, Address: objectAdmin.EntityDTO.Address, PhoneNumber: objectAdmin.EntityDTO.PhoneNumber },
	};

	if (validateObjectAdmin(objectAdminDTO.EntityDTO, dispatch, userConstants.OBJECT_ADMIN_UPDATE_FAILURE)) {
		dispatch(request());

		Axios.put(`/user-api/api/users/object-admin`, objectAdminDTO, { validateStatus: () => true, headers: authHeader() })
			.then((res) => {
				if (res.status === 200) {
					dispatch(success("Object admin successfully updated", objectAdmin));
				} else {
					dispatch(failure("Error while updating object admin"));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function request() {
		return { type: userConstants.OBJECT_ADMIN_UPDATE_REQUEST };
	}
	function success(message, objectAdmin) {
		return { type: userConstants.OBJECT_ADMIN_UPDATE_SUCCESS, successMessage: message, objectAdmin };
	}
	function failure(message) {
		return { type: userConstants.OBJECT_ADMIN_UPDATE_FAILURE, errorMessage: message };
	}
}

function deleteObjectAdmin(objectAdminId, dispatch) {
	dispatch(request());

	Axios.delete(`/user-api/api/users/object-admin/${objectAdminId}`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success("Object admin successfully deleted", objectAdminId));
			} else {
				dispatch(failure("Error while deleting object admin"));
			}
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: userConstants.OBJECT_ADMIN_DELETE_REQUEST };
	}
	function success(message, objectAdminId) {
		return { type: userConstants.OBJECT_ADMIN_DELETE_SUCCESS, successMessage: message, objectAdminId };
	}
	function failure(message) {
		return { type: userConstants.OBJECT_ADMIN_DELETE_FAILURE, errorMessage: message };
	}
}

function validateObjectAdmin(objectAdmin, dispatch, type) {
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
		return { type, errorMessage: message };
	}

	return true;
}

async function findAllObjectAdmins(dispatch) {
	dispatch(request());

	await Axios.get(`/user-api/api/users/object-admin`, { validateStatus: () => true, headers: authHeader() })
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

async function findAllDelivererRequests(dispatch) {
	dispatch(request());

	await Axios.get(`/user-api/api/users/deliverer-request`, { validateStatus: () => true, headers: authHeader() })
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
		return { type: userConstants.SET_DELIVERER_REQUEST };
	}
	function success(data) {
		return { type: userConstants.SET_DELIVERER_REQUEST_SUCCESS, delivererRequests: data };
	}
	function failure(message) {
		return { type: userConstants.SET_DELIVERER_REQUEST_ERROR, errorMessage: message };
	}
}

async function findAllDeliverer(dispatch) {
	dispatch(request());

	await Axios.get(`/user-api/api/users/deliverers`, { validateStatus: () => true, headers: authHeader() })
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
		return { type: userConstants.SET_DELIVERERS_REQUEST };
	}
	function success(data) {
		return { type: userConstants.SET_DELIVERERS_SUCCESS, deliverers: data };
	}
	function failure(message) {
		return { type: userConstants.SET_DELIVERERS_ERROR, errorMessage: message };
	}
}

function createWaiter(waiter, dispatch) {
	if (validateWaiter(waiter, dispatch, userConstants.WAITER_CREATE_FAILURE)) {
		dispatch(request());

		Axios.post(`/user-api/api/users/employee/waiter`, waiter, { validateStatus: () => true, headers: authHeader() })
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

function updateWaiter(waiter, dispatch) {
	let waiterDTO = {
		Id: waiter.Id,
		EntityDTO: { Name: waiter.EntityDTO.Name, Surname: waiter.EntityDTO.Surname, Address: waiter.EntityDTO.Address, PhoneNumber: waiter.EntityDTO.PhoneNumber },
	};

	if (validateWaiter(waiterDTO.EntityDTO, dispatch, userConstants.WAITER_UPDATE_FAILURE)) {
		dispatch(request());

		Axios.put(`/user-api/api/users/employee/waiter`, waiterDTO, { validateStatus: () => true, headers: authHeader() })
			.then((res) => {
				if (res.status === 200) {
					dispatch(success("Waiter successfully updated", waiter));
				} else {
					dispatch(failure("Error while updating waiter info"));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function request() {
		return { type: userConstants.WAITER_UPDATE_REQUEST };
	}
	function success(message, waiter) {
		return { type: userConstants.WAITER_UPDATE_SUCCESS, successMessage: message, waiter };
	}
	function failure(message) {
		return { type: userConstants.WAITER_UPDATE_FAILURE, errorMessage: message };
	}
}

async function findAllWaiters(dispatch) {
	dispatch(request());

	await Axios.get(`/user-api/api/users/employee/waiter`, { validateStatus: () => true, headers: authHeader() })
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
		return { type: userConstants.SET_WAITERS_REQUEST };
	}
	function success(data) {
		return { type: userConstants.SET_WAITERS_SUCCESS, waiters: data };
	}
	function failure(message) {
		return { type: userConstants.SET_WAITERS_ERROR, errorMessage: message };
	}
}

function validateWaiter(waiter, dispatch, type) {
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
		return { type, errorMessage: message };
	}

	return true;
}

function login(loginRequest, dispatch) {
	dispatch(request());

	Axios.post(`/auth-api/api/auth/login`, loginRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				setAuthInLocalStorage(res.data);
				dispatch(success(res.data));
				window.location = "#/";
			} else if (res.status === 401) {
				dispatch(failure(res.data.message));
			} else if (res.status === 403) {
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
	Axios.get(`/user-api/api/users/check-existence/` + userId, { validateStatus: () => true })
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

function resendActivationLinkRequest(userId, dispatch) {
	dispatch(request());
	Axios.post(`/user-api/api/users/activation-link-request`, userId, { validateStatus: () => true })
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
		return { type: userConstants.RESEND_ACTIVATION_LINK_REQUEST };
	}
	function success() {
		return { type: userConstants.RESEND_ACTIVATION_LINK_SUCCESS };
	}
	function failure(error) {
		return { type: userConstants.RESEND_ACTIVATION_LINK_FAILURE, errorMessage: error };
	}
}

function changeFirstPassword(changePasswordRequest, dispatch) {
	let [passwordValid, passwordErrorMessage] = validatePasswords(changePasswordRequest.password, changePasswordRequest.repeatedPassword);

	if (passwordValid === true) {
		dispatch(request());

		Axios.post(`/user-api/api/users/change-first-password`, changePasswordRequest, { validateStatus: () => true })
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

function resetPasswordLinkRequest(resetPasswordLinkRequest, dispatch) {
	dispatch(request());

	Axios.post(`/user-api/api/users/reset-password-link-request`, resetPasswordLinkRequest, { validateStatus: () => true })
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
		return { type: userConstants.RESET_PASSWORD_LINK_REQUEST };
	}
	function success(emailAddress) {
		return { type: userConstants.RESET_PASSWORD_LINK_SUCCESS, emailAddress };
	}
	function failure(error) {
		return { type: userConstants.RESET_PASSWORD_LINK_FAILURE, errorMessage: error };
	}
}

function resetPassword(resetPasswordRequest, dispatch) {
	let [passwordValid, passwordErrorMessage] = validatePasswords(resetPasswordRequest.password, resetPasswordRequest.passwordRepeat);

	if (passwordValid === true) {
		dispatch(request());

		Axios.post(`/user-api/api/users/reset-password`, resetPasswordRequest, { validateStatus: () => true })
			.then((res) => {
				if (res.status === 200) {
					dispatch(success());
				} else {
					dispatch(failure("Reset password token expired or used"));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		dispatch(failure(passwordErrorMessage));
	}

	function request() {
		return { type: userConstants.RESET_PASSWORD_REQUEST };
	}
	function success() {
		return { type: userConstants.RESET_PASSWORD_SUCCESS };
	}
	function failure(error) {
		return { type: userConstants.RESET_PASSWORD_FAILURE, errorMessage: error };
	}
}

function logout() {
	deleteLocalStorage();
	window.location = "#/login";
}

function checkIfActivationTokenIsValid(token) {
	Axios.post(`/user-api/api/users/check-if-activation-token-valid`, token, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 400) {
				//TODO 1: izmeniti u neku stranicu za token je istekao
				window.location = "#/404";
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

function checkIfResetPasswordTokenIsValid(token) {
	Axios.post(`/user-api/api/users/check-if-reset-password-token-valid`, token, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 400) {
				//TODO 1: izmeniti u neku stranicu za token je istekao
				window.location = "#/404";
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

function approveDelivererRequest(requestIdDTO, dispatch) {
	Axios.put(`/user-api/api/users/deliverer-request/approve/${requestIdDTO.id}`, requestIdDTO, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				findAllDelivererRequests(dispatch);
				dispatch(success("Uspesno ste odobrili novog dostavljaca"));
			} else {
				dispatch(failure("Trenutno nije moguce odobriti datog dostavljaca"));
			}
		})
		.catch((err) => {
			dispatch(failure("Trenutno nije moguce odobriti datog dostavljaca"));
		});

	function success(message) {
		return { type: userConstants.ACCEPT_DELIVERER_REQUEST_SUCCESS, successMessage: message };
	}
	function failure(message) {
		return { type: userConstants.OBJECT_ADMIN_DELETE_FAILURE, errorMessage: message };
	}
}

function rejectDelivererRequest(rejectRequestDTO, dispatch) {
	if (rejectRequestDTO.Reason.length < 10) {
		dispatch(failure("Razlog odbijanja zahteva mora sadrzati minimalno 10 slova"));
		return;
	}

	Axios.put(`/user-api/api/users/deliverer-request/reject/`, rejectRequestDTO, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				findAllDelivererRequests(dispatch);
				dispatch(success("Uspesno ste odbili zahtev za novog dostavljaca"));
			} else {
				dispatch(failure("Trenutno nije moguce odbiti zahtev za datog dostavljaca"));
			}
		})
		.catch((err) => {
			dispatch(failure("Trenutno nije moguce odbiti zahtev za datog dostavljaca"));
		});

	function success(message) {
		return { type: userConstants.REJECT_DELIVERER_REQUEST_SUCCESS, successMessage: message };
	}

	function failure(message) {
		return { type: userConstants.REJECT_DELIVERER_REQUEST_FAILURE, errorMessage: message };
	}
}

function activateDeliverer(deliverer, dispatch) {
	dispatch(request());

	Axios.put(`/user-api/api/users/deliverers/${deliverer.Id}/activate`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				deliverer.EntityDTO.DelivererStatus = "ACTIVE";
				dispatch(success("Deliverer successfully activated", deliverer));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: userConstants.DELIVERER_ACTIVATION_REQUEST };
	}
	function success(message, deliverer) {
		return { type: userConstants.DELIVERER_ACTIVATION_SUCCESS, successMessage: message, deliverer };
	}
	function failure(message) {
		return { type: userConstants.DELIVERER_ACTIVATION_FAILURE, errorMessage: message };
	}
}

function deactivateDeliverer(deliverer, dispatch) {
	dispatch(request());

	Axios.put(`/user-api/api/users/deliverers/${deliverer.Id}/deactivate`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				deliverer.EntityDTO.DelivererStatus = "INACTIVE";
				dispatch(success("Deliverer successfully deactivated", deliverer));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: userConstants.DELIVERER_DEACTIVATION_REQUEST };
	}
	function success(message, deliverer) {
		return { type: userConstants.DELIVERER_DEACTIVATION_SUCCESS, successMessage: message, deliverer };
	}
	function failure(message) {
		return { type: userConstants.DELIVERER_DEACTIVATION_FAILURE, errorMessage: message };
	}
}

function deleteDeliverer(deliverer, dispatch) {
	dispatch(request());

	Axios.delete(`/user-api/api/users/deliverers/${deliverer.Id}`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				dispatch(success("Deliverer successfully deleted", deliverer));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: userConstants.DELIVERER_DELETE_REQUEST };
	}
	function success(message, deliverer) {
		return { type: userConstants.DELIVERER_DELETE_SUCCESS, successMessage: message, deliverer };
	}
	function failure(message) {
		return { type: userConstants.DELIVERER_DELETE_FAILURE, errorMessage: message };
	}
}
