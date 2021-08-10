import { authConstants } from "../constants/AuthConstants";

let authCpy = {};

export const authReducer = (state, action) => {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				...state,
				userLogin: {
					showError: false,
					errorMessage: "",
					successLogin: false,
				},
				userActivate: {
					notActivated: false,
					userId: "",
					userEmail: "",
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case authConstants.LOGIN_FAILURE:
			return {
				...state,
				userLogin: {
					showError: true,
					errorMessage: "Sorry, your email or password was incorrect. Please double-check your password.",
					successLogin: false,
				},
				userActivate: {
					notActivated: false,
					userId: "",
					userEmail: "",
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case authConstants.LOGIN_VALIDATION_FAILURE:
			return {
				...state,
				userLogin: {
					showError: true,
					errorMessage: action.error,
					successLogin: false,
				},

				userActivate: {
					notActivated: false,
					userId: "",
					userEmail: "",
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case authConstants.LOGIN_SUCCESS:
			return {
				...state,
				userLogin: {
					showError: false,
					errorMessage: "",
					successLogin: true,
				},
				userLogout: {
					successLogout: false,
				},

				userActivate: {
					notActivated: false,
					userId: "",
					userEmail: "",
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};

		case authConstants.LOGOUT_SUCCESS:
			return {
				...state,
				userLogout: {
					successLogout: true,
				},
				userLogin: {
					showError: false,
					errorMessage: "",
					successLogin: false,
				},

				userActivate: {
					notActivated: false,
					userId: "",
					userEmail: "",
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};

		case authConstants.LOGIN_USER_NOT_ACTIVE:
			return {
				...state,
				userLogout: {
					successLogout: true,
				},
				userLogin: {
					showError: false,
					errorMessage: "",
					successLogin: false,
				},
				userActivate: {
					notActivated: true,
					userId: action.userId,
					userEmail: "",
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};

		case authConstants.RESEND_ACTIVATION_LINK_REQUEST:
			authCpy = { ...state };
			authCpy.userActivate.showError = false;
			authCpy.userActivate.errorMessage = "";
			authCpy.userActivate.showSuccessMessage = false;

			return authCpy;

		case authConstants.RESET_PASSWORD_LINK_REQUEST:
			return {
				...state,
				resetPassword: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
					emailAddress: "",
				},
			};
		case authConstants.RESET_PASSWORD_LINK_SUCCESS:
			return {
				...state,
				resetPassword: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
					emailAddress: action.emailAddress,
				},
			};
		case authConstants.RESET_PASSWORD_LINK_FAILURE:
			return {
				...state,
				resetPassword: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
					emailAddress: "",
				},
			};

		case authConstants.RESEND_ACTIVATION_LINK_SUCCESS:
			return {
				...state,
				userLogin: {
					showError: false,
					errorMessage: "",
					successLogin: false,
				},
				userActivate: {
					notActivated: false,
					userId: "",
					userEmail: "",
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
			};

		case authConstants.RESEND_ACTIVATION_LINK_FAILURE:
			authCpy = { ...state };
			authCpy.userActivate.showError = true;
			authCpy.userActivate.errorMessage = action.errorMessage;
			authCpy.userActivate.showSuccessMessage = false;

			return authCpy;

		case authConstants.INACTIVE_USER_EMAIL_SUCCESS:
			authCpy = { ...state };
			authCpy.userActivate.userEmail = action.emailAddress;

			return authCpy;

		case authConstants.INACTIVE_USER_EMAIL_FAILURE:
			authCpy = { ...state };
			authCpy.userActivate.showError = true;
			authCpy.userActivate.errorMessage = action.errorMessage;
			authCpy.userActivate.showSuccessMessage = false;

			return authCpy;

		default:
			return state;
	}
};
