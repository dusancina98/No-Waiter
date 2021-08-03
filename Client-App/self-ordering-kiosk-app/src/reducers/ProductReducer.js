import { productConstants } from "../constants/ProductConstants";

export const productReducer = (state, action) => {
	switch (action.type) {
		case productConstants.SET_PRODUCTS_REQUEST:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				products: [],
				showedProducts: [],
			};
		case productConstants.SET_PRODUCTS_SUCCESS:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				products: action.products,
				showedProducts: action.products,
			};
		case productConstants.SET_PRODUCTS_ERROR:
			return {
				...state,
				showError: true,
				errorMessage: action.errorMessage,
				showSuccessMessage: false,
				successMessage: "",
				products: [],
				showedProducts: [],
			};
		case productConstants.SET_CATEGORIES_REQUEST:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				categories: [],
			};
		case productConstants.SET_CATEGORIES_SUCCESS:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				categories: action.categories,
			};
		case productConstants.SET_CATEGORIES_ERROR:
			return {
				...state,
				showError: true,
				errorMessage: action.errorMessage,
				showSuccessMessage: false,
				successMessage: "",
				categories: [],
			};
		case productConstants.DISABLE_PRODUCTS_FILTER:
			return {
				...state,
				selectedCategory: {
					Id: "",
					EntityDTO: {
						Name: "Sve",
					},
				},
				showedProducts: state.products,
				selectedCategoryNumber:-1,
			};
		case productConstants.FILTER_PRODUCTS_BY_CATEGORY:
			let showedPr = state.products.filter((product) => product.EntityDTO.ProductCategory.EntityDTO.Name === action.filter.EntityDTO.Name);
			return {
				...state,
				selectedCategory: action.filter,
				showedProducts: showedPr,
				selectedCategoryNumber: action.id,
			};
	
		default:
			return state;
	}
};
