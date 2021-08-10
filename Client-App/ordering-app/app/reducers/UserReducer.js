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

		case userConstants.SET_USER_ADDRESSES_REQUEST:
			return {
				...state,
				userAddresses: [],
			};

		case userConstants.SET_USER_ADDRESSES_SUCCESS:
			return {
				...state,
				userAddresses: action.addresses,
			};
		case userConstants.SET_USER_ADDRESSES_FAILURE:
			return {
				...state,
				userAddresses: [],
			};

		case userConstants.ADD_USER_ADDRESS_REQUEST:
			userCpy = { ...state };
			userCpy.addAddress.success = false;
			userCpy.addAddress.showError = false;
			userCpy.addAddress.errorMessage = "";

			return userCpy;

		case userConstants.ADD_USER_ADDRESS_SUCCESS:
			userCpy = { ...state };
			userCpy.addAddress.success = true;
			userCpy.addAddress.showError = false;
			userCpy.addAddress.errorMessage = "";

			if (userCpy.userAddresses.find((address) => address.Id === action.address.Id) === undefined) {
				userCpy.userAddresses.push(action.address);
			}

			return userCpy;
		case userConstants.ADD_USER_ADDRESS_FAILURE:
			userCpy = { ...state };
			userCpy.addAddress.success = false;
			userCpy.addAddress.showError = true;
			userCpy.addAddress.errorMessage = action.error;

			return userCpy;

		case userConstants.REMOVE_USER_ADDRESS_REQUEST:
			return state;

		case userConstants.REMOVE_USER_ADDRESS_SUCCESS:
			userCpy = { ...state };
			userCpy.userAddresses = state.userAddresses.filter((address) => address.Id !== action.addressId);

			return userCpy;
		case userConstants.REMOVE_USER_ADDRESS_FAILURE:
			return state;

		default:
			return state;
	}
};
