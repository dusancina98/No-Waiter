import { createContext, useReducer } from "react";
import { objectReducer } from "../reducers/ObjectReducer";

export const ObjectContext = createContext();

const ObjectContextProvider = (props) => {
	const [objectState, dispatch] = useReducer(objectReducer, {
		createObject: {
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
		},
		editObject: {
			showSuccessMessage: false,
			successMessage: "",
			showErrorMessage: false,
			errorMessage: "",
		},
		objects: [],
		showError: false,
		errorMessage: "",
	});

	return <ObjectContext.Provider value={{ objectState, dispatch }}>{props.children}</ObjectContext.Provider>;
};

export default ObjectContextProvider;
