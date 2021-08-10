import { userConstants } from "../constants/UserConstants";

export const userReducer = (state, action) => {
	switch (action.type) {
		case userConstants.REGISTRATION_REQUEST:
			return {
				...state,
				registration: {
					showError: false,
					errorMessage: "",
					successfullySent: false,
				},
			};
		case userConstants.REGISTRATION_SUCCESS:
			return {
				...state,
				registration: {
					showError: false,
					errorMessage: "",
					successfullySent: true,
				},
			};
		case userConstants.REGISTRATION_FAILURE:
			return {
				...state,
				registration: {
					showError: true,
					errorMessage: action.error,
					successfullySent: false,
				},
			};
		default:
			return state;
	}
};
