import { createContext, useReducer } from "react";
import { userReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
	const [userState, dispatch] = useReducer(userReducer, {
		createObjectAdmin: {
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
