import { createContext, useReducer } from "react";
import { productReducer } from "../reducers/ProductReducer";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
	const [productState, dispatch] = useReducer(productReducer, {
		createCategory: {
			showModal: false,
		},
		createProduct: {
			imageSelected: false,
			showedImage: "",
			showModal: false,
			productTypes: [],
			showedPage: 1,
			showErrorMessage: false,
			errorMessage: "",
			product: {
				Category: "",
				Name: "",
				MeasureUnit: "",
				Amount: "",
				Price: "",
				ProductTypeId: "",
				Description: "",
				Image: "",
				Ingredients: [],
				SideDishes: [],
			},
		},
		selectedCategory: {
			Id: "",
			EntityDTO: {
				Name: "",
			},
		},
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
