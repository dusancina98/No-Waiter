import { authConstants } from "../constants/AuthConstants";

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
			};
		case authConstants.LOGIN_FAILURE:
			return {
				...state,
				userLogin: {
					showError: true,
					errorMessage: "Sorry, your email or password was incorrect. Please double-check your password.",
					successLogin: false,
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
			};

		case authConstants.CREATE_EMPLOYMENT_REQUEST_REQUEST:
			return {
				...state,
				employmentRequest: {
					showError: false,
					errorMessage: "",
					successfullySent: false,
				},
			};
		case authConstants.CREATE_EMPLOYMENT_REQUEST_VALIDATION_FAILURE:
			return {
				...state,
				employmentRequest: {
					showError: true,
					errorMessage: action.error,
					successfullySent: false,
				},
			};
		case authConstants.CREATE_EMPLOYMENT_REQUEST_FAILURE:
			return {
				...state,
				employmentRequest: {
					showError: true,
					errorMessage: action.error,
					successfullySent: false,
				},
			};
		case authConstants.CREATE_EMPLOYMENT_REQUEST_SUCCESS:
			return {
				...state,
				employmentRequest: {
					showError: false,
					errorMessage: "",
					successfullySent: true,
				},
			};
		default:
			return state;
	}
};
