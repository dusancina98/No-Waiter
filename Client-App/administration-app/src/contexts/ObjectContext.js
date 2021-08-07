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
		objects: [],
		showError: false,
		errorMessage: "",
		showSuccessMessage: false,
		successMessage:'',
		generatedToken:"",
	});

	return <ObjectContext.Provider value={{ objectState, dispatch }}>{props.children}</ObjectContext.Provider>;
};

export default ObjectContextProvider;
