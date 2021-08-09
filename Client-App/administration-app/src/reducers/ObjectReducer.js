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
					workTimeReadOnly: true,
					object: action.object,
				},
			};
			var foundIndex = pom.objects.findIndex((object) => object.Id === action.object.Id);
			pom.objects[foundIndex] = action.object;
			pom.objectInfo.object.EntityDTO.Name= action.object.EntityDTO.Name;
			pom.objectInfo.object.EntityDTO.Email= action.object.EntityDTO.Email;
			pom.objectInfo.object.EntityDTO.PhoneNumber= action.object.EntityDTO.PhoneNumber;
			pom.objectInfo.object.EntityDTO.Address= action.object.EntityDTO.Address;

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
		case objectConstants.INVALID_WORKTIMES_INPUT_FAILURE:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
			}
		case objectConstants.OBJECT_UPDATE_WORKTIME_SUCCESS:
			let objectUpdateWorkTimeSuccess = {
				...state,
				editObject: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
					showErrorMessage: false,
					errorMessage: "",
				},
			};
			objectUpdateWorkTimeSuccess.objectDetails.showModal = true;
			objectUpdateWorkTimeSuccess.objectDetails.readOnly = true;
			objectUpdateWorkTimeSuccess.objectDetails.workTimeReadOnly = true;
			objectUpdateWorkTimeSuccess.objectInfo.object.EntityDTO.WorkTime = action.objectWorktime.WorkTime;
		
			return objectUpdateWorkTimeSuccess;
		case objectConstants.OBJECT_UPDATE_WORKTIME_FAILURE:{
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
			};
		}
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
							WorkTime : {
								EntityDTO: {
									Id: "",
									WorkDays: {
										SUNDAY :{
											Working:'false',
											TimeFrom:'',
											TimeTo:'',
										},
										TUESDAY :{
											Working:'false',
											TimeFrom:'',
											TimeTo:'',
										},
										THURSDAY :{
											Working:'false',
											TimeFrom:'',
											TimeTo:'',
										},
										SATURDAY :{
											Working:'false',
											TimeFrom:'',
											TimeTo:'',
										},
										MONDAY :{
											Working:'false',
											TimeFrom:'',
											TimeTo:'',
										},
										FRIDAY :{
											Working:'false',
											TimeFrom:'',
											TimeTo:'',
										},
										WEDNESDAY:{
											Working:'false',
											TimeFrom:'',
											TimeTo:'',
										},
									}
								}
							}
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
					workTimeReadOnly: true,
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
					workTimeReadOnly:true,
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
			let blockingObject = { ...state };
			blockingObject.editObject.showSuccessMessage= true;
			blockingObject.editObject.successMessage= action.successMessage;
			blockingObject.editObject.showErrorMessage= false;
			blockingObject.editObject.errorMessage= "";

			blockingObject.objectDetails.showModal= true;
			blockingObject.objectDetails.readOnly= true;
			blockingObject.objectDetails.object= action.object;
			blockingObject.objectDetails.object.EntityDTO.Active = false;
			
			return blockingObject;
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
					workTimeReadOnly:true,
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
					workTimeReadOnly: true,
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
					workTimeReadOnly:true,
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
		case modalConstants.ALLOW_OBJECT_WORKTIME_INPUT_FIELDS:
			let worktimeField = { ...state };
			worktimeField.objectDetails.workTimeReadOnly = false;
			return worktimeField;
		case objectConstants.GENERATE_SELF_ORDERING_TOKEN_SUCCESS:
			let selfOrderingSuccess = { ...state };
			selfOrderingSuccess.generatedToken = action.jwtToken;
			return selfOrderingSuccess;
		case objectConstants.GENERATE_SELF_ORDERING_TOKEN_FAILURE:
			let selfOrderingFailure = { ...state };
			selfOrderingFailure.generatedToken = '';
			return selfOrderingFailure;
		case objectConstants.OBJECT_DELETE_SUCCESS:
			let deleteOrderSuccess = { ...state };

			deleteOrderSuccess.editObject.showSuccessMessage= false;
			deleteOrderSuccess.editObject.successMessage= '';
			deleteOrderSuccess.editObject.showErrorMessage= false;
			deleteOrderSuccess.editObject.errorMessage= '';

			deleteOrderSuccess.objectDetails.showModal= false;
			deleteOrderSuccess.objectDetails.readOnly= true;
			deleteOrderSuccess.objectDetails.object= {
				Id: "",
				EntityDTO: {
					Email: "",
					Name: "",
					Address: "",
					PhoneNumber: "",
					ImagePath: "",
				},
			};

			deleteOrderSuccess.showSuccessMessage =true;
			deleteOrderSuccess.successMessage =action.successMessage;

			deleteOrderSuccess.objects= deleteOrderSuccess.objects.filter((item) => item.Id !== action.object.Id);

			return deleteOrderSuccess;
		case objectConstants.OBJECT_DELETE_FAILURE:
			return {
				...state,
				editObject: {
					showSuccessMessage: false,
					successMessage: '',
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
				objectDetails: {
					showModal: true,
					readOnly: true,
					workTimeReadOnly:true,
					object: action.object,
				},
			};
		case objectConstants.DELETE_OBJECT_HIDE_SUCCESS_MESSAGE:
			let hideSuccessMessage = { ...state };
			hideSuccessMessage.showSuccessMessage =false;
			hideSuccessMessage.successMessage ='';
			return hideSuccessMessage;
		default:
			return state;
	}
};
