import { createContext, useReducer } from "react";
import { productReducer } from "../reducers/ProductReducer";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
	const [productState, dispatch] = useReducer(productReducer, {
		selectedCategory: {
			Id: "",
			EntityDTO: {
				Name: "SVE",
			},
		},
		selectedCategoryNumber: -1,
		showedProducts: [],
		products: [],
		categories: [],
		showError: false,
		errorMessage: "",
		showSuccessMessage: false,
		successMessage: "",
		});

	return <ProductContext.Provider value={{ productState, dispatch }}>{props.children}</ProductContext.Provider>;
};

export default ProductContextProvider;
