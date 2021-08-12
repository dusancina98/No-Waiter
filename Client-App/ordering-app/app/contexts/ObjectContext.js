import React, { createContext, useReducer } from "react";
import { objectReducer } from "../reducers/ObjectReducer";

export const ObjectContext = createContext();

const ObjectContextProvider = (props) => {
	const [objectState, dispatch] = useReducer(objectReducer, {
		objects : [],
		objectDetails : {
			object: { 
				EntityDTO:  {
					Address: "",
					Favorite: false,
					ImagePath: "",
					Name: "",
					Opened: false,
					Rating: 0,
				},
				Id: "",
			  },
			categories: ["All products"],
			products: [],
			showedProducts: [{ 
				EntityDTO:  {
					Address: "",
					Favorite: false,
					Image: "",
					Name: "",
					Opened: false,
					Rating: 0,
				},
				Id: "",
			  }],
			selectedCategory: "All products",
		}
	});

	return <ObjectContext.Provider value={{ objectState, dispatch }}>{props.children}</ObjectContext.Provider>;
};

export default ObjectContextProvider;
