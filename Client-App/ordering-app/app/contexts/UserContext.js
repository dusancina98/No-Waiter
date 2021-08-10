import React, { createContext, useReducer } from "react";
import { userReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
	const [userState, dispatch] = useReducer(userReducer, {
		registration: {
			showError: false,
			errorMessage: "",
			successfullySent: false,
		},
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
		userAddresses: [],
		addAddress: {
			showError: false,
			errorMessage: "",
			success: false,
		},
	});

	return <UserContext.Provider value={{ userState, dispatch }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
