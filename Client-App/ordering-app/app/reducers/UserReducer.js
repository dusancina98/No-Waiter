import { userConstants } from "../constants/UserConstants";

let userCpy = {};

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

		case userConstants.USER_PROFILE_REQUEST:
			return {
				...state,
				profileEdit: {
					user: {
						Email: "",
						Name: "",
						Surname: "",
						PhoneNumber: "",
					},
					editSuccess: false,
					showError: false,
					errorMessage: "",
				},
			};
		case userConstants.USER_PROFILE_SUCCESS:
			return {
				...state,
				profileEdit: {
					user: action.user,
					editSuccess: false,
					showError: false,
					errorMessage: "",
				},
			};
		case userConstants.USER_PROFILE_FAILURE:
			return {
				...state,
				profileEdit: {
					user: {
						Email: "",
						Name: "",
						Surname: "",
						PhoneNumber: "",
					},
					editSuccess: false,
					showError: true,
					errorMessage: action.error,
				},
			};

		case userConstants.EDIT_USER_PROFILE_REQUEST:
			userCpy = { ...state };
			userCpy.profileEdit.editSuccess = false;
			userCpy.profileEdit.showError = false;
			userCpy.profileEdit.errorMessage = "";

			return userCpy;

		case userConstants.EDIT_USER_PROFILE_SUCCESS:
			userCpy = { ...state };
			userCpy.profileEdit.editSuccess = true;
			userCpy.profileEdit.showError = false;
			userCpy.profileEdit.errorMessage = "";

			return userCpy;
		case userConstants.EDIT_USER_PROFILE_FAILURE:
			userCpy = { ...state };
			userCpy.profileEdit.editSuccess = false;
			userCpy.profileEdit.showError = true;
			userCpy.profileEdit.errorMessage = action.error;

			return userCpy;
		default:
			return state;
	}
};
