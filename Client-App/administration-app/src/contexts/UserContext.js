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
		objectAdmins: [],
		showError: false,
		errorMessage: "",
	});

	return <UserContext.Provider value={{ userState, dispatch }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
