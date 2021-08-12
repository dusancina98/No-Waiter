import { Alert } from "react-native";
import { productConstants } from "../constants/ProductConstants";

let objCpy = {};

export const productReducer = (state, action) => {
	switch (action.type) {
		case productConstants.GET_OBJECT_CATEGORIES_REQUEST:
			objCpy = { ...state };
			objCpy.categories = ["All products"];

			return objCpy;
		case productConstants.GET_OBJECT_CATEGORIES_SUCCESS:
			objCpy = { ...state };
			objCpy.categories = ["All products"];

			for (var category in action.categories) {
				objCpy.categories.push(action.categories[category].EntityDTO.Name);
			}

			return objCpy;
		case productConstants.GET_OBJECT_CATEGORIES_FAILURE:
			objCpy = { ...state };
			objCpy.categories = ["All products"];

			return objCpy;
		case productConstants.FIND_PRODUCTS_BY_CATEGORY: {
			console.log(objCpy.selectedCategory)
			objCpy = { ...state };
			objCpy.selectedCategory = objCpy.categories[action.selectedTab];
			if ("All products" === objCpy.selectedCategory) {
				objCpy.showedProducts = objCpy.products;
			} else {
				objCpy.showedProducts = objCpy.products.filter((product) => product.EntityDTO.ProductCategory.EntityDTO.Name === objCpy.selectedCategory);
			}
			console.log(objCpy.selectedCategory)

			return objCpy;
		}
		case productConstants.GET_OBJECT_PRODUCTS_REQUEST:
			objCpy = { ...state };
			objCpy.products = [];

			return objCpy;
		case productConstants.GET_OBJECT_PRODUCTS_SUCCESS:
			objCpy = { ...state };
			objCpy.products = action.products;
			objCpy.showedProducts = action.products;

			return objCpy;
		case productConstants.GET_OBJECT_PRODUCTS_FAILURE:
			objCpy = { ...state };

			objCpy.products = [];

			return objCpy;
		default:
			return state;
	}
};
