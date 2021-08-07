import { createContext, useReducer } from "react";
import { productReducer } from "../reducers/ProductReducer";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
	const [productState, dispatch] = useReducer(productReducer, {
		createCategory: {
			showModal: false,
			showErrorMessage: false,
			errorMessage: ''
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
		productDetails: {
			productId: "",
		},
		updateProduct: {
			showModal: false,
			showedPage: 1,
			productTypes: [],
			showErrorMessage: false,
			errorMessage: "",
			product: {
				Id: "",
				EntityDTO: {
					Amount: "",
					Ingredients: [],
					SideDishes: [],
					Description: "",
					MeasureUnit: "",
					Name: "",
					Price: "",
					ProductTypeId: "",
				},
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
