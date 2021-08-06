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
			};
		default:
			return state;
	}
};
