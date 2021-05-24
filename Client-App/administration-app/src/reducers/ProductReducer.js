import { modalConstants } from "../constants/ModalConstants";
import { productConstants } from "../constants/ProductConstants";

export const productReducer = (state, action) => {
	switch (action.type) {
		case modalConstants.SHOW_CREATE_CATEGORY_MODAL:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				createCategory: {
					showModal: true,
				},
			};
		case modalConstants.HIDE_CREATE_CATEGORY_MODAL:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				createCategory: {
					showModal: false,
				},
			};
		case productConstants.CATEGORY_CREATE_REQUEST:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				createCategory: {
					showModal: false,
				},
			};
		case productConstants.CATEGORY_CREATE_SUCCESS:
			let arrCategories = [...state.categories];
			arrCategories.push(action.category);
			return {
				...state,
				showError: false,
				showSuccessMessage: true,
				errorMessage: "",
				successMessage: action.successMessage,
				createCategory: {
					showModal: false,
				},
				categories: arrCategories,
			};
		case productConstants.CATEGORY_CREATE_FAILURE:
			return {
				...state,
				showError: true,
				errorMessage: action.errorMessage,
				showSuccessMessage: false,
				successMessage: "",
				createCategory: {
					showModal: false,
				},
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

		case productConstants.FILTER_PRODUCTS_BY_CATEGORY:
			let showedPr = state.products.filter((product) => product.EntityDTO.ProductCategory.EntityDTO.Name === action.filter);
			return {
				...state,
				selectedCategory: action.filter,
				showedProducts: showedPr,
			};
		case productConstants.DISABLE_PRODUCTS_FILTER:
			return {
				...state,
				selectedCategory: "",
				showedProducts: state.products,
			};

		case productConstants.CREATE_PRODUCT_IMAGE_SELECTED:
			let st = { ...state };
			st.createProduct.imageSelected = true;
			st.createProduct.showedImage = action.showedImage;
			return st;
		case productConstants.CREATE_PRODUCT_IMAGE_DESELECTED:
			let sta = { ...state };
			sta.createProduct.imageSelected = false;
			sta.createProduct.showedImage = "";
			return sta;
		default:
			return state;
	}
};
