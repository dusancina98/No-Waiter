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
		objectInfo: {
			imageSelected: false,
			showedImage: "",
			showError: false,
			errorMessage: "",
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
		objects: [],
		showError: false,
		errorMessage: "",
	});

	return <ObjectContext.Provider value={{ objectState, dispatch }}>{props.children}</ObjectContext.Provider>;
};

export default ObjectContextProvider;
