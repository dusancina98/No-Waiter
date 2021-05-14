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
			case userConstants.LOGIN_REQUEST:
				return {
					loginError: {
						showError: false,
						errorMessage: "",
					},
				};
			case userConstants.LOGIN_FAILURE:
				return {
					loginError: {
						showError: true,
						errorMessage: "Sorry, your email or password was incorrect. Please double-check your password.",
					},
				};
			case userConstants.LOGIN_SUCCESS:
				return {
					loginError: {
						showError: false,
						errorMessage: "",
					},
				};
			case userConstants.INACTIVE_USER_EMAIL_REQUEST:
				return {
					inActiveUser: {
						showError: false,
						errorMessage: "",
						showSuccessMessage: false,
						emailAddress: action.emailAddress,
					},
				};
			case userConstants.RESEND_ACTIVATION_LINK_REQUEST:
				return {
					inActiveUser: {
						showError: false,
						errorMessage: "",
						showSuccessMessage: false,
					},
				};
			case userConstants.RESEND_ACTIVATION_LINK_SUCCESS:
				return {
					inActiveUser: {
						showError: false,
						errorMessage: "",
						showSuccessMessage: true,
					},
				};
			case userConstants.RESEND_ACTIVATION_LINK_FAILURE:
				return {
					inActiveUser: {
						showError: true,
						errorMessage: action.errorMessage,
						showSuccessMessage: false,
					},
				};
			case userConstants.FIRST_ACTIVATION_PASSWORD_CHANGE_REQUEST:
				return {
					changePassword: {
						showError: false,
						errorMessage: "",
						showSuccessMessage: false,
					},
				};
			case userConstants.FIRST_ACTIVATION_PASSWORD_CHANGE_SUCCESS:
				return {
					changePassword: {
						showError: false,
						errorMessage: "",
						showSuccessMessage: true,
					},
				};
			case userConstants.FIRST_ACTIVATION_PASSWORD_CHANGE_FAILURE:
				return {
					changePassword: {
						showError: true,
						errorMessage: action.errorMessage,
						showSuccessMessage: false,
					},
				};
		default:
			return state;
	}
};
