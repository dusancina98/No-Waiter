import React, { createContext, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const [authState, dispatch] = useReducer(authReducer, {
		userLogin: {
			showError: false,
			errorMessage: "",
			successLogin: false,
		},
		userActivate: {
			notActivated: false,
			userId: "",
			userEmail: "",
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
		},
		userLogout: {
			successLogout: false,
		},
		resetPassword: {
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
			emailAddress: "",
		},
		registration: {
			showError: false,
			errorMessage: "",
			successfullySent: false,
		},
	});

	return <AuthContext.Provider value={{ authState, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
