import { modalConstants } from "../constants/ModalConstants";
import { objectConstants } from "../constants/ObjectConstants";

export const objectReducer = (state, action) => {
	switch (action.type) {
		case objectConstants.OBJECT_CREATE_REQUEST:
			return {
				...state,
				createObject: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case objectConstants.OBJECT_CREATE_SUCCESS:
			return {
				...state,
				createObject: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
			};
		case objectConstants.OBJECT_CREATE_FAILURE:
			return {
				...state,
				createObject: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
				},
			};
		case objectConstants.SET_OBJECTS_REQUEST:
			return {
				...state,
				showError: false,
				errorMessage: "",
				objects: [],
			};
		case objectConstants.SET_OBJECTS_SUCCESS:
			return {
				...state,
				showError: false,
				errorMessage: "",
				objects: action.objects,
			};
		case objectConstants.SET_OBJECTS_ERROR:
			return {
				...state,
				showError: true,
				errorMessage: action.errorMessage,
				objects: [],
			};
		case objectConstants.OBJECT_ACTIVATION_REQUEST:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case objectConstants.OBJECT_ACTIVATION_SUCCESS:
			return {
				...state,
				editObject: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
					showErrorMessage: false,
					errorMessage: "",
				},
				objectDetails: {
					showModal: true,
					readOnly: true,
					object: action.object,
				},
			};
		case objectConstants.OBJECT_ACTIVATION_FAILURE:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
			};
		case objectConstants.OBJECT_DEACTIVATION_REQUEST:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case objectConstants.OBJECT_DEACTIVATION_SUCCESS:
			return {
				...state,
				editObject: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
					showErrorMessage: false,
					errorMessage: "",
				},
				objectDetails: {
					showModal: true,
					readOnly: true,
					object: action.object,
				},
			};
		case objectConstants.OBJECT_DEACTIVATION_FAILURE:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
			};
		case objectConstants.OBJECT_BLOCKING_REQUEST:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case objectConstants.OBJECT_BLOCKING_SUCCESS:
			return {
				...state,
				editObject: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
					showErrorMessage: false,
					errorMessage: "",
				},
				objectDetails: {
					showModal: true,
					readOnly: true,
					object: action.object,
				},
			};
		case objectConstants.OBJECT_BLOCKING_FAILURE:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
			};

		case objectConstants.OBJECT_UNBLOCKING_REQUEST:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case objectConstants.OBJECT_UNBLOCKING_SUCCESS:
			return {
				...state,
				editObject: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
					showErrorMessage: false,
					errorMessage: "",
				},
				objectDetails: {
					showModal: true,
					readOnly: true,
					object: action.object,
				},
			};
		case objectConstants.OBJECT_UNBLOCKING_FAILURE:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
			};
		case objectConstants.HIDE_OBJECT_EDIT_SUCCESS:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
				objectDetails: {
					showModal: true,
					readOnly: true,
					object: action.object,
				},
			};
		case objectConstants.HIDE_OBJECT_EDIT_FAILURE:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case modalConstants.SHOW_OBJECT_DETAILS:
			return {
				...state,
				objectDetails: {
					showModal: true,
					readOnly: true,
					object: action.object,
				},
			};
		case modalConstants.HIDE_OBJECT_DETAILS:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
				objectDetails: {
					showModal: false,
					readOnly: true,
					object: {
						Id: "",
						EntityDTO: {
							Email: "",
							Name: "",
							Address: "",
							PhoneNumber: "",
							ImagePath: "",
						},
					},
				},
			};
		case modalConstants.ALLOW_OBJECT_DETAILS_INPUT_FIELDS:
			let prom = { ...state };
			prom.objectDetails.readOnly = false;
			return prom;

		default:
			return state;
	}
};
