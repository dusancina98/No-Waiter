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

		case modalConstants.SHOW_UPDATE_PRODUCT_MODAL:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				updateProduct: {
					showModal: true,
					showedPage: 1,
					productTypes: [],
					showErrorMessage: false,
					errorMessage: "",
					product: action.product,
				},
			};
		case modalConstants.HIDE_UPDATE_PRODUCT_MODAL:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
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
							ProductType: "",
							PhoneNumber: "",
						},
					},
				},
			};
		case productConstants.UPDATE_PRODUCT_SUBMIT_FIRST_PAGE:
			let statU = { ...state };
			statU.updateProduct.product = action.product;
			statU.updateProduct.showedPage = 2;
			return statU;
		case productConstants.UPDATE_PRODUCT_BACK_TO_FIRST_PAGE:
			let statsU = { ...state };
			statsU.updateProduct.showedPage = 1;
			return statsU;

		case productConstants.UPDATE_PRODUCT_MODAL_HIDE_ERROR:
			let statesU = { ...state };
			statesU.updateProduct.showErrorMessage = false;
			statesU.updateProduct.errorMessage = "";
			return statesU;

		case productConstants.PRODUCT_UPDATE_REQUEST:
			let stateesU = { ...state };
			stateesU.updateProduct.showErrorMessage = false;
			stateesU.updateProduct.errorMessage = "";
			return stateesU;

		case productConstants.PRODUCT_UPDATE_SUCCESS:
			let idxProdU = state.products.findIndex((product) => product.Id === action.product.Id);
			let cpyProdU = { ...state.products[idxProdU] };
			console.log(action.product, idxProdU, cpyProdU, state.products);
			let idxShowProdU = state.showedProducts.findIndex((product) => product.Id === action.product.Id);

			cpyProdU.EntityDTO.Amount = action.product.EntityDTO.Amount;
			cpyProdU.EntityDTO.Ingredients = action.product.EntityDTO.Ingredients;
			cpyProdU.EntityDTO.SideDishes = action.product.EntityDTO.SideDishes;
			cpyProdU.EntityDTO.Description = action.product.EntityDTO.Description;
			cpyProdU.EntityDTO.MeasureUnit = action.product.EntityDTO.MeasureUnit;
			cpyProdU.EntityDTO.Name = action.product.EntityDTO.Name;
			cpyProdU.EntityDTO.Price = action.product.EntityDTO.Price;
			cpyProdU.EntityDTO.ProductTypeId = action.product.EntityDTO.ProductTypeId;

			let arrProdU = [...state.products];
			arrProdU[idxProdU] = cpyProdU;
			let arrShowedProdU = [...state.showedProducts];
			arrShowedProdU[idxShowProdU] = cpyProdU;
			return {
				...state,
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
							ProductType: "",
							PhoneNumber: "",
						},
					},
				},
				showSuccessMessage: true,
				successMessage: action.successMessage,
				products: arrProdU,
				showedProducts: arrShowedProdU,
			};
		case productConstants.PRODUCT_UPDATE_FAILURE:
			let staeteeesU = { ...state };
			staeteeesU.updateProduct.showErrorMessage = true;
			staeteeesU.updateProduct.errorMessage = action.errorMessage;
			return staeteeesU;

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
			let foundProdIndex = stta.products.findIndex((product) => product.Id === action.productId);
			let foundShowProdIndex = stta.showedProducts.findIndex((product) => product.Id === action.productId);

			let prod = { ...stta.products[foundProdIndex] };
			console.log(foundProdIndex, prod, action.productId, stta);
			prod.EntityDTO.Image = action.imageUrl;
			stta.products[foundProdIndex] = prod;
			stta.showedProducts[foundShowProdIndex] = prod;

			return stta;

		case productConstants.PRODUCT_TOGGLE_DETAILS:
			return {
				...state,
				productDetails: {
					productId: state.productDetails.productId === action.productId ? "" : action.productId,
				},
			};

		case productConstants.PRODUCT_IMAGE_CHANGE_FAILURE:
			let sttta = { ...state };
			sttta.showError = true;
			sttta.showSuccessMessage = false;
			sttta.successMessage = "";
			sttta.errorMessage = action.errorMessage;
			return sttta;
		case productConstants.CATEGORY_CREATE_REQUEST:
			return {
				...state,
				showError: false,
				errorMessage: "",
				showSuccessMessage: false,
				successMessage: "",
				createCategory: {
					showModal: true,
					showErrorMessage: false,
					errorMessage: "",
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
					showErrorMessage: false,
					errorMessage: "",
				},
				categories: arrCategories,
			};
		case productConstants.CATEGORY_CREATE_FAILURE:
			return {
				...state,
				showError: false,
				errorMessage: '',
				showSuccessMessage: false,
				successMessage: "",
				createCategory: {
					showModal: true,
					showErrorMessage: true,
					errorMessage: action.errorMessage,
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
				selectedCategory: {
					Id: "",
					EntityDTO: {
						Name: "",
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
			ssstate.updateProduct.productTypes = [];

			return ssstate;
		case productConstants.SET_PRODUCT_TYPES_SUCCESS:
			let sssstate = { ...state };
			sssstate.createProduct.productTypes = action.productTypes;
			sssstate.updateProduct.productTypes = action.productTypes;

			return sssstate;
		case productConstants.SET_PRODUCT_TYPES_ERROR:
			let ssssstate = { ...state };
			ssssstate.createProduct.productTypes = [];
			ssssstate.updateProduct.productTypes = [];

			return {
				...state,
				showError: true,
				errorMessage: action.errorMessage,
				showSuccessMessage: false,
				successMessage: "",
				createProduct: ssssstate.createProduct,
			};
		case productConstants.PRODUCT_DELETE_SUCCESS:
			let productDeleteSuccess = {...state };
			productDeleteSuccess.showedProducts= productDeleteSuccess.showedProducts.filter((product) => product.Id !== action.productId);
			productDeleteSuccess.products= productDeleteSuccess.products.filter((product) => product.Id !== action.productId);
			
			productDeleteSuccess.showError= false;
			productDeleteSuccess.showSuccessMessage= '';
			productDeleteSuccess.showSuccessMessage= true;
			productDeleteSuccess.successMessage= action.successMessage;

			return productDeleteSuccess;
		case productConstants.PRODUCT_DELETE_FAILURE:
			let productDeleteFailure = {...state };
			
			productDeleteFailure.showError= true;
			productDeleteFailure.showSuccessMessage= action.errorMessage;
			productDeleteFailure.showSuccessMessage= false;
			productDeleteFailure.successMessage= '';

			return productDeleteFailure;
		case productConstants.HIDE_PRODUCT_ALERT_MESSAGE:
			let hideProductAlertMessage = {...state };
			
			hideProductAlertMessage.showError= false;
			hideProductAlertMessage.showSuccessMessage= '';
			hideProductAlertMessage.showSuccessMessage= false;
			hideProductAlertMessage.successMessage= '';

			return hideProductAlertMessage;
		case productConstants.CATEGORY_DELETE_SUCCESS:{
			let categoryDeleteSuccess = {...state};

			categoryDeleteSuccess.categories = categoryDeleteSuccess.categories.filter((category) => category.Id !== action.categoryId);
			categoryDeleteSuccess.selectedCategory = {
				Id: "",
				EntityDTO: {
					Name: "",
				},
			};
			categoryDeleteSuccess.products = categoryDeleteSuccess.products.filter((product) => product.EntityDTO.ProductCategory.Id !== action.categoryId);
			categoryDeleteSuccess.showedProducts = categoryDeleteSuccess.showedProducts.filter((product) => product.EntityDTO.ProductCategory.Id !== action.categoryId);

			categoryDeleteSuccess.showError= false;
			categoryDeleteSuccess.showErrorMessage= '';
			categoryDeleteSuccess.showSuccessMessage= true;
			categoryDeleteSuccess.successMessage=action.successMessage;

			return categoryDeleteSuccess;
		}
		case productConstants.CATEGORY_DELETE_FAILURE:{
			let categoryDeleteFailure = {...state };
			
			categoryDeleteFailure.showError= true;
			categoryDeleteFailure.showErrorMessage= action.errorMessage;
			categoryDeleteFailure.showSuccessMessage= false;
			categoryDeleteFailure.successMessage= '';

			return categoryDeleteFailure;
		}
		default:
			return state;
	}
};
