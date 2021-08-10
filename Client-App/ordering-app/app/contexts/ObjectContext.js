import React, { createContext, useReducer } from "react";
import { objectReducer } from "../reducers/ObjectReducer";

export const ObjectContext = createContext();

const ObjectContextProvider = (props) => {
	const [objectState, dispatch] = useReducer(objectReducer, {
		objects : [],
		showObject: {
			objectId: '',
			objectDetails: [],
			categories:[],
			products:[],
			showError:false,
			errorMessage:'',
			showSuccess:false,
			successMessage:'',
		},
	});

	return <ObjectContext.Provider value={{ objectState, dispatch }}>{props.children}</ObjectContext.Provider>;
};

export default ObjectContextProvider;
