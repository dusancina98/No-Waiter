import { modalConstants } from "../constants/ModalConstants";
import { userConstants } from "../constants/UserConstants";

export const userReducer = (state, action) => {
	var temp;
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
			let stateCpy = {
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
			var foundIndex = stateCpy.objectAdmins.findIndex((objectAdmin) => objectAdmin.Id === action.objectAdmin.Id);
			stateCpy.objectAdmins[foundIndex] = action.objectAdmin;

			return stateCpy;
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
		case userConstants.OBJECT_ADMIN_DELETE_REQUEST:
			return {
				...state,
				deleteObjectAdmin: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case userConstants.OBJECT_ADMIN_DELETE_SUCCESS:
			let stCpy = {
				...state,
				deleteObjectAdmin: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
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
			var newListAdmins = stCpy.objectAdmins.filter((objectAdmin) => objectAdmin.Id !== action.objectAdminId);
			stCpy.objectAdmins = newListAdmins;
			return stCpy;
		case userConstants.OBJECT_ADMIN_DELETE_FAILURE:
			return {
				...state,
				deleteObjectAdmin: {
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
		case userConstants.WAITER_UPDATE_REQUEST:
			return {
				...state,
				editWaiter: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case userConstants.WAITER_UPDATE_SUCCESS:
			let pom = {
				...state,
				editWaiter: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
					showErrorMessage: false,
					errorMessage: "",
				},
				waiterDetails: {
					showModal: true,
					readOnly: true,
					waiter: action.waiter,
				},
			};
			var foundIdx = pom.waiters.findIndex((waiter) => waiter.Id === action.waiter.Id);
			pom.waiters[foundIdx] = action.waiter;

			return pom;
		case userConstants.WAITER_UPDATE_FAILURE:
			return {
				...state,
				editWaiter: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
			};
		case userConstants.SET_WAITERS_REQUEST:
			return {
				...state,
				waiters: [],
				showWaitersError: false,
				waitersErrorMessage: "",
			};
		case userConstants.SET_WAITERS_SUCCESS:
			return {
				...state,
				showWaitersError: false,
				waitersErrorMessage: "",
				waiters: action.waiters,
			};
		case userConstants.SET_WAITERS_ERROR:
			return {
				...state,
				showWaitersError: true,
				waitersErrorMessage: action.errorMessage,
				waiters: [],
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
		case modalConstants.SHOW_WAITER_DETAILS:
			return {
				...state,
				waiterDetails: {
					showModal: true,
					readOnly: true,
					waiter: action.waiter,
				},
			};
		case modalConstants.HIDE_WAITER_DETAILS:
			return {
				...state,
				editWaiter: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
				waiterDetails: {
					showModal: false,
					readOnly: true,
					waiter: {
						Id: "",
						EntityDTO: {
							Email: "",
							Name: "",
							Surname: "",
							Address: "",
							PhoneNumber: "",
						},
					},
				},
			};
		case modalConstants.ALLOW_WAITER_DETAILS_INPUT_FIELDS:
			let temp1 = { ...state };
			temp1.waiterDetails.readOnly = false;
			return temp1;
		case userConstants.INACTIVE_USER_EMAIL_REQUEST:
			return {
				inActiveUser: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
					emailAddress: action.emailAddress,
				},
			};
		case userConstants.RESEND_ACTIVATION_LINK_REQUEST:
			return {
				inActiveUser: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case userConstants.RESEND_ACTIVATION_LINK_SUCCESS:
			return {
				inActiveUser: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
			};
		case userConstants.RESEND_ACTIVATION_LINK_FAILURE:
			return {
				inActiveUser: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
				},
			};
		case userConstants.FIRST_ACTIVATION_PASSWORD_CHANGE_REQUEST:
			return {
				changePassword: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case userConstants.FIRST_ACTIVATION_PASSWORD_CHANGE_SUCCESS:
			return {
				changePassword: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
			};
		case userConstants.FIRST_ACTIVATION_PASSWORD_CHANGE_FAILURE:
			return {
				changePassword: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
				},
			};
		case modalConstants.ALLOW_OBJECT_ADMIN_DETAILS_INPUT_FIELDS:
			let prom = { ...state };
			prom.objectAdminDetails.readOnly = false;
			return prom;
		case userConstants.RESET_PASSWORD_LINK_REQUEST:
			return {
				forgotPasswordRequestLinkError: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
					emailAddress: "",
				},
			};
		case userConstants.RESET_PASSWORD_LINK_SUCCESS:
			return {
				forgotPasswordRequestLinkError: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
					emailAddress: action.emailAddress,
				},
			};
		case userConstants.RESET_PASSWORD_LINK_FAILURE:
			return {
				forgotPasswordRequestLinkError: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
					emailAddress: "",
				},
			};
		case userConstants.RESET_PASSWORD_REQUEST:
			return {
				resetPassword: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case userConstants.RESET_PASSWORD_SUCCESS:
			return {
				resetPassword: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
			};
		case userConstants.RESET_PASSWORD_FAILURE:
			return {
				resetPassword: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
				},
			};
		case userConstants.SET_DELIVERER_REQUEST:
			return {
				...state,
				delivererRequest:{
					showError: false,
					errorMessage: "",
					requests: [],
				},
				approveDeliveryRequest: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				},
				rejectDeliveryRequest: {
					showSuccessMessage: false,
					successMessage: "",
					showErrorMessage: false,
					errorMessage: "",
				}
			};
		case userConstants.SET_DELIVERER_REQUEST_SUCCESS:
			return {
				...state,
				delivererRequest:{
					showError: false,
					errorMessage: "",
					requests: action.delivererRequests,
				}
			};
		case userConstants.SET_DELIVERER_REQUEST_ERROR:
			return {
				...state,
				delivererRequest:{
					showError: true,
					errorMessage: action.errorMessage,
					requests: [],
				}
			};
		case modalConstants.SHOW_DELIVERER_REQUEST_DETAILS:
			return {
				...state,
				delivererRequestDetails:{
					showModal: true,
					showRejectWindow: false,
					requestDetails: action.delivererRequest,
				}
			};
		case modalConstants.HIDE_DELIVERER_REQUEST_DETAILS:
			return {
				...state,
				delivererRequestDetails:{
					showModal: false,
					showRejectWindow: false,
					requestDetails: {
						Id: "",
						EntityDTO: {
							Email: "",
							Name: "",
							Surname: "",
							PhoneNumber: "",
							Reference:"",
						},
					},
				}
			};
		case userConstants.ACCEPT_DELIVERER_REQUEST_SUCCESS:
			return {
				...state,
				delivererRequestDetails:{
					showModal: false,
					showRejectWindow: false,
					requestDetails: {
	 					Id: "",
						EntityDTO: {
							Email: "",
							Name: "",
							Surname: "",
							PhoneNumber: "",
							Reference:"",
						},
					},
				},
				approveDeliveryRequest: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
					showErrorMessage: false,
					errorMessage: "",
				},
				rejectDeliveryRequest: {
					showSuccessMessage: false,
					successMessage: '',
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case userConstants.REJECT_DELIVERER_REQUEST_SUCCESS:
			return {
				...state,
				delivererRequestDetails:{
					showModal: false,
					showRejectWindow: false,
					requestDetails: {
	 					Id: "",
						EntityDTO: {
							Email: "",
							Name: "",
							Surname: "",
							PhoneNumber: "",
							Reference:"",
						},
					},
				},
				rejectDeliveryRequest: {
					showSuccessMessage: true,
					successMessage: action.successMessage,
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		case userConstants.REJECT_DELIVERER_REQUEST_FAILURE:
			return {
				...state,
				rejectDeliveryRequest: {
					showSuccessMessage: false,
					successMessage: '',
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
			};
		case userConstants.HIDE_FAILURE_ALERT_REJECT_DELIVERY_REQUEST:
			return {
				...state,
				rejectDeliveryRequest: {
					showSuccessMessage: false,
					successMessage: '',
					showErrorMessage: false,
					errorMessage: '',
				},
			}
		case modalConstants.SHOW_DELIVERER_REQUEST_REJECT_WINDOW:
		    temp = { ...state };
			temp.delivererRequestDetails.showRejectWindow = true;
			return temp;
		case modalConstants.BACK_FROM_DELIVERER_REQUEST_REJECT_WINDOW:
			temp = { ...state };
			temp.delivererRequestDetails.showRejectWindow = false;
			temp.rejectDeliveryRequest.showErrorMessage =false;
			return temp;
		case userConstants.ACCEPT_DELIVERER_REQUEST_FAILURE:
			return {
				...state,
				delivererRequestDetails:{
					showModal: false,
					showRejectWindow: false,
					requestDetails: {
	 					Id: "",
						EntityDTO: {
							Email: "",
							Name: "",
							Surname: "",
							PhoneNumber: "",
							Reference:"",
						},
					},
				},
				approveDeliveryRequest: {
					showSuccessMessage: false,
					successMessage: action.successMessage,
					showErrorMessage: true,
					errorMessage: action.errorMessage,
				},
				rejectDeliveryRequest: {
					showSuccessMessage: false,
					successMessage: '',
					showErrorMessage: false,
					errorMessage: "",
				},
			};
		default:
			return state;
	}
};
