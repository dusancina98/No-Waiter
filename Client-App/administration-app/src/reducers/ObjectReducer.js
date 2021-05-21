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
		case objectConstants.OBJECT_UPDATE_REQUEST:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case objectConstants.OBJECT_UPDATE_SUCCESS:
			let pom = {
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
			var foundIndex = pom.objects.findIndex((object) => object.Id === action.object.Id);
			pom.objects[foundIndex] = action.object;

			return pom;
		case objectConstants.OBJECT_UPDATE_FAILURE:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: true,
					errorMessage: action.errorMessage,
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

		case objectConstants.OBJECT_INFO_REQUEST:
			return {
				...state,
				objectInfo: {
					imageSelected: false,
					showError: false,
					errorMessage: "",
					showedImage: "",
					showSuccessMessage: false,
					successMessage: "",
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
		case objectConstants.OBJECT_INFO_SUCCESS:
			return {
				...state,
				objectInfo: {
					imageSelected: false,
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
					successMessage: "",
					showedImage: action.objectInfo.EntityDTO.ImagePath,
					object: action.objectInfo,
				},
			};
		case objectConstants.OBJECT_INFO_FAILURE:
			return {
				...state,
				objectInfo: {
					imageSelected: false,
					showedImage: "",
					showError: true,
					showSuccessMessage: false,
					successMessage: "",
					errorMessage: action.errorMessage,
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
		case objectConstants.OBJECT_IMAGE_SELECTED:
			let st = { ...state };
			st.objectInfo.imageSelected = true;
			st.objectInfo.showedImage = action.showedImage;
			return st;
		case objectConstants.OBJECT_IMAGE_DESELECTED:
			let sta = { ...state };
			sta.objectInfo.imageSelected = false;
			sta.objectInfo.showedImage = sta.objectInfo.object.EntityDTO.ImagePath;
			return sta;

		case objectConstants.OBJECT_IMAGE_CHANGE_REQUEST:
			let stt = { ...state };
			stt.objectInfo.showError = false;
			stt.objectInfo.showSuccessMessage = false;
			stt.objectInfo.successMessage = "";
			stt.objectInfo.errorMessage = "";

			return stt;
		case objectConstants.OBJECT_IMAGE_CHANGE_SUCCESS:
			let stta = { ...state };

			stta.objectInfo.showError = false;
			stta.objectInfo.errorMessage = "";
			stta.objectInfo.showSuccessMessage = true;
			stta.objectInfo.successMessage = action.successMessage;
			stta.objectInfo.object.EntityDTO.ImagePath = stta.objectInfo.showedImage;
			return stta;
		case objectConstants.OBJECT_IMAGE_CHANGE_FAILURE:
			let sttta = { ...state };
			sttta.objectInfo.showError = true;
			sttta.objectInfo.showSuccessMessage = false;
			sttta.objectInfo.successMessage = "";
			sttta.objectInfo.errorMessage = action.errorMessage;
			return sttta;

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
