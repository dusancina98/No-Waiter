import { userConstants } from "../constants/UserConstants";

export const userReducer = (state, action) => {
	switch (action.type) {
		case userConstants.OBJECT_ADMIN_CREATE_REQUEST:
			return {
				...state,
				createObjectAdmin: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case userConstants.OBJECT_ADMIN_CREATE_SUCCESS:
			return {
				...state,
				createObjectAdmin: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
			};
		case userConstants.OBJECT_ADMIN_CREATE_FAILURE:
			return {
				...state,
				createObjectAdmin: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
				},
			};
		case userConstants.SET_OBJECT_ADMINS_REQUEST:
			return {
				...state,
				showError: false,
				errorMessage: "",
				objectAdmins: [],
			};
		case userConstants.SET_OBJECT_ADMINS_SUCCESS:
			return {
				...state,
				showError: false,
				errorMessage: "",
				objectAdmins: action.objectAdmins,
			};
		case userConstants.SET_OBJECT_ADMINS_ERROR:
			return {
				...state,
				showError: true,
				errorMessage: action.errorMessage,
				objectAdmins: [],
			};
		case userConstants.WAITER_CREATE_REQUEST:
			return {
				...state,
				createWaiter: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case userConstants.WAITER_CREATE_SUCCESS:
			return {
				...state,
				createWaiter: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
			};
		case userConstants.WAITER_CREATE_FAILURE:
			return {
				...state,
				createWaiter: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
				},
			};

		default:
			return state;
	}
};
