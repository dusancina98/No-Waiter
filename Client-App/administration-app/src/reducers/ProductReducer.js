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

		case modalConstants.SHOW_CREATE_PRODUCT_MODAL:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				createProduct: {
					imageSelected: false,
					showedImage: "",
					showModal: true,
					productTypes: [],
					showedPage: 1,
					showErrorMessage: false,
					errorMessage: "",
					product: {
						CategoryId: "",
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
			};
		case modalConstants.HIDE_CREATE_PRODUCT_MODAL:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				createProduct: {
					imageSelected: false,
					showedImage: "",
					showModal: false,
					productTypes: [],
					showedPage: 1,
					showErrorMessage: false,
					errorMessage: "",
					product: {
						CategoryId: "",
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
			let showedPr = state.products.filter((product) => product.EntityDTO.ProductCategory.EntityDTO.Name === action.filter.EntityDTO.Name);
			return {
				...state,
				selectedCategory: action.filter,
				showedProducts: showedPr,
			};
		case productConstants.DISABLE_PRODUCTS_FILTER:
			return {
				...state,
				selectedCategory: {
					Id: "",
					EntityDTO: {
						Name: "",
					},
				},
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

		case productConstants.CREATE_PRODUCT_SUBMIT_FIRST_PAGE:
			let stat = { ...state };
			stat.createProduct.product = action.product;
			stat.createProduct.showedPage = 2;
			return stat;
		case productConstants.CREATE_PRODUCT_BACK_TO_FIRST_PAGE:
			let stats = { ...state };
			stats.createProduct.showedPage = 1;
			return stats;
		case productConstants.CREATE_PRODUCT_MODAL_HIDE_ERROR:
			let states = { ...state };
			states.createProduct.showErrorMessage = false;
			states.createProduct.errorMessage = "";
			return states;

		case productConstants.PRODUCT_CREATE_REQUEST:
			let statees = { ...state };
			statees.createProduct.showErrorMessage = false;
			statees.createProduct.errorMessage = "";
			return statees;

		case productConstants.PRODUCT_CREATE_SUCCESS:
			let arrProd = [...state.products];
			arrProd.push(action.product);

			return {
				...state,
				createProduct: {
					imageSelected: false,
					showedImage: "",
					showModal: false,
					productTypes: [],
					showedPage: 1,
					showErrorMessage: false,
					errorMessage: "",
					product: {
						CategoryId: "",
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
				showSuccessMessage: true,
				successMessage: action.successMessage,
				products: arrProd,
			};
		case productConstants.PRODUCT_CREATE_FAILURE:
			let staeteees = { ...state };
			staeteees.createProduct.showErrorMessage = true;
			staeteees.createProduct.errorMessage = action.errorMessage;
			return staeteees;

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

		case productConstants.SET_PRODUCT_TYPES_REQUEST:
			let ssstate = { ...state };
			ssstate.createProduct.productTypes = [];
			return ssstate;
		case productConstants.SET_PRODUCT_TYPES_SUCCESS:
			let sssstate = { ...state };
			sssstate.createProduct.productTypes = action.productTypes;
			return sssstate;
		case productConstants.SET_PRODUCT_TYPES_ERROR:
			let ssssstate = { ...state };
			ssssstate.createProduct.productTypes = [];

			return {
				...state,
				showError: true,
				errorMessage: action.errorMessage,
				showSuccessMessage: false,
				successMessage: "",
				createProduct: ssssstate.createProduct,
			};

		default:
			return state;
	}
};
