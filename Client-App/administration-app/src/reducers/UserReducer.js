import { modalConstants } from "../constants/ModalConstants";
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
		case userConstants.OBJECT_ADMIN_UPDATE_REQUEST:
			return {
				...state,
				editObjectAdmin: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case userConstants.OBJECT_ADMIN_UPDATE_SUCCESS:
			let pom = {
				...state,
				editObjectAdmin: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
					showErrorMessage: false,
					errorMessage: "",
				},
				objectAdminDetails: {
					showModal: true,
					readOnly: true,
					objectAdmin: action.objectAdmin,
				},
			};
			var foundIndex = pom.objectAdmins.findIndex((objectAdmin) => objectAdmin.Id === action.objectAdmin.Id);
			pom.objectAdmins[foundIndex] = action.objectAdmin;

			return pom;
		case userConstants.OBJECT_ADMIN_UPDATE_FAILURE:
			return {
				...state,
				editObjectAdmin: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: true,
					errorMessage: action.errorMessage,
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
		case modalConstants.SHOW_OBJECT_ADMIN_DETAILS:
			return {
				...state,
				objectAdminDetails: {
					showModal: true,
					readOnly: true,
					objectAdmin: action.objectAdmin,
				},
			};
		case modalConstants.HIDE_OBJECT_ADMIN_DETAILS:
			return {
				...state,
				editObjectAdmin: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
				objectAdminDetails: {
					showModal: false,
					readOnly: true,
					objectAdmin: {
						Id: "",
						EntityDTO: {
							Email: "",
							Name: "",
							Surname: "",
							Address: "",
							ObjectName: "",
							PhoneNumber: "",
						},
					},
				},
			};
		case modalConstants.ALLOW_OBJECT_ADMIN_DETAILS_INPUT_FIELDS:
			let prom = { ...state };
			prom.objectAdminDetails.readOnly = false;
			return prom;
		default:
			return state;
	}
};
