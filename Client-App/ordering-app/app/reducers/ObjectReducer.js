import { Alert } from "react-native";
import { objectConstants } from "../constants/ObjectConstants";

let objCpy = {};

export const objectReducer = (state, action) => {
	switch (action.type) {
		case objectConstants.FIND_ALL_OBJECTS_REQUEST:
			return {
				...state,
				objects:[],
			};
		case objectConstants.FIND_ALL_OBJECTS_SUCCESS:
			return {
				...state,
				objects:action.objects,
			};
		case objectConstants.FIND_ALL_OBJECTS_FAILURE:
			return {
				...state,
				objects:[],
			};
		case objectConstants.GET_OBJECT_DETAILS_REQUEST:
			objCpy = { ...state };
			objCpy.objectDetails.object =  { 
				EntityDTO:  {
					Address: "",
					Favorite: false,
					ImagePath: "",
					Name: "",
					Opened: false,
					Rating: 0,
				},
				Id: "",
			  };

			return objCpy;
		case objectConstants.GET_OBJECT_DETAILS_SUCCESS:
			objCpy = { ...state };
			objCpy.objectDetails.object = action.object;

			return objCpy;
		case objectConstants.GET_OBJECT_DETAILS_FAILURE:
			objCpy = { ...state };
			objCpy.objectDetails.object = [];

			return objCpy;

		case objectConstants.GET_OBJECT_CATEGORIES_REQUEST:
			objCpy = { ...state };
			objCpy.objectDetails.categories =  ["All products"];

			return objCpy;
		case objectConstants.GET_OBJECT_CATEGORIES_SUCCESS:
			objCpy = { ...state };
			objCpy.objectDetails.categories = ["All products"];
			
			for(var category in action.categories){
				objCpy.objectDetails.categories.push(action.categories[category].EntityDTO.Name);
			}

			return objCpy;
		case objectConstants.GET_OBJECT_CATEGORIES_FAILURE:
			objCpy = { ...state };
			objCpy.objectDetails.categories = ["All products"];

			return objCpy;
		case objectConstants.FIND_PRODUCTS_BY_CATEGORY:{
			objCpy = { ...state };
			objCpy.objectDetails.selectedCategory= objCpy.objectDetails.categories[action.selectedTab];
			if("All products" === objCpy.objectDetails.selectedCategory){
				objCpy.objectDetails.showedProducts=objCpy.objectDetails.products;
			}else{
				objCpy.objectDetails.showedProducts= objCpy.objectDetails.products.filter((product) => product.EntityDTO.ProductCategory.EntityDTO.Name === objCpy.objectDetails.selectedCategory);
			}


			return objCpy;
		}
		case objectConstants.GET_OBJECT_PRODUCTS_REQUEST:
			objCpy = { ...state };
			objCpy.objectDetails.products = [];

			return objCpy;
		case objectConstants.GET_OBJECT_PRODUCTS_SUCCESS:
			objCpy = { ...state };
			objCpy.objectDetails.products = action.products;
			objCpy.objectDetails.showedProducts = action.products;

			return objCpy;
		case objectConstants.GET_OBJECT_PRODUCTS_FAILURE:
			objCpy = { ...state };

			objCpy.objectDetails.products = [];

			return objCpy;
		default:
			return state;
	}
};
