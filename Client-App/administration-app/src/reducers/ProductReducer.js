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

		case productConstants.PRODUCT_IMAGE_CHANGE_REQUEST:
			let stt = { ...state };
			stt.showError = false;
			stt.showSuccessMessage = false;
			stt.successMessage = "";
			stt.errorMessage = "";

			return stt;
		case productConstants.PRODUCT_IMAGE_CHANGE_SUCCESS:
			let stta = { ...state };

			stta.showError = false;
			stta.errorMessage = "";
			stta.showSuccessMessage = true;
			stta.successMessage = action.successMessage;
			let foundProdIndex = stta.products.findIndex((product) => product.id === action.productId);
			let foundShowProdIndex = stta.showedProducts.findIndex((product) => product.id === action.productId);

			let prod = { ...stta.products[foundProdIndex] };
			prod.EntityDTO.ImagePath = action.imageUrl;
			stta.products[foundProdIndex] = prod;
			stta.showedProducts[foundShowProdIndex] = prod;

			return stta;

		case productConstants.PRODUCT_TOGGLE_DETAILS:
			let prStta = { ...state };

			prStta.productDetails.productId = prStta.productDetails.productId === action.productId ? "" : action.productId;
			return prStta;

		case productConstants.PRODUCT_IMAGE_CHANGE_FAILURE:
			let sttta = { ...state };
			sttta.showError = true;
			sttta.showSuccessMessage = false;
			sttta.successMessage = "";
			sttta.errorMessage = action.errorMessage;
			return sttta;
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
			let cpyProd = action.product;
			delete cpyProd.CategoryId;
			cpyProd.EntityDTO.ProductCategory = state.selectedCategory;
			let arrProd = [...state.products];
			let arrShowedProd = [...state.showedProducts];
			arrProd.push(cpyProd);
			arrShowedProd.push(cpyProd);
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
				showedProducts: arrShowedProd,
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
