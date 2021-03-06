import { createContext, useReducer } from "react";
import { userReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
	const [userState, dispatch] = useReducer(userReducer, {
		loginError: {
			showError: false,
			errorMessage: "",
		},
		createObjectAdmin: {
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
		},
		inActiveUser: {
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
			emailAddress: "",
		},
		changePassword: {
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
		},
		createWaiter: {
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
		},
		editObjectAdmin: {
			showSuccessMessage: false,
			successMessage: "",
			showErrorMessage: false,
			errorMessage: "",
		},
		deleteObjectAdmin: {
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
					ObjectId: "",
					PhoneNumber: "",
				},
			},
		},
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
		forgotPasswordRequestLinkError: {
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
			emailAddress: "",
		},
		resetPassword: {
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
		},
		waiters: [],
		showWaitersError: false,
		waitersErrorMessage: "",
		objectAdmins: [],
		showError: false,
		errorMessage: "",
		delivererRequest:{
			showError: false,
			errorMessage: "",
			requests: [],
		},
		delivererRequestDetails: {
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
			successMessage: "",
			showErrorMessage: false,
			errorMessage: "",
		},
		rejectDeliveryRequest: {
			showSuccessMessage: false,
			successMessage: "",
			showErrorMessage: false,
			errorMessage: "",
		},
		deliverers: [],
		delivererDetails: {
			showModal: false,
			deliverer: {
				Id: "",
				EntityDTO: {
					Email: "",
					Name: "",
					Surname: "",
					PhoneNumber: "",
					DelivererStatus:"",
				},
			},
		},
		editDeliverer: {
			showSuccessMessage: false,
			successMessage: "",
			showErrorMessage: false,
			errorMessage: "",
		},
		deleteDeliverer: {
			showSuccessMessage: false,
			successMessage: "",
			showErrorMessage: false,
			errorMessage: "",
		},
		loggedUserInfo:{
			name:'',
			surname:'',
		}
	});

	return <UserContext.Provider value={{ userState, dispatch }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
