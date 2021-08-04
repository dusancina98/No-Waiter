import { orderConstants } from "../constants/OrderConstants";

var ordCpy = {};

export const orderReducer = (state, action) => {
	switch (action.type) {
		case orderConstants.SHOW_ORDER_ITEM_DETAILS:
			ordCpy = { ...state };

			ordCpy.createOrder.pageVisible=2;
			ordCpy.createOrder.selectedProduct=action.product;

			return ordCpy;
		case orderConstants.HIDE_ORDER_ITEM_DETAILS:
			ordCpy = { ...state };

			ordCpy.createOrder.pageVisible=1;
			ordCpy.createOrder.selectedProduct=null;

			return ordCpy;
		case orderConstants.CHOOSE_ORDER_TYPE:
			ordCpy = { ...state };

			ordCpy.orderType = action.orderType;

			return ordCpy;
		case orderConstants.RESET_ORDER:
			ordCpy = { ...state };

			ordCpy.orderType = "";
			ordCpy.createOrder.pageVisible=1;
			ordCpy.createOrder.items=[];  
			ordCpy.createOrder.selectedProduct=""; 

			return ordCpy;
		case orderConstants.ADD_PRODUCT_TO_SHOPPING_CART:
			ordCpy = { ...state };

			ordCpy.createOrder.pageVisible=1;
			if (ordCpy.createOrder.orderItems.find((prod) => prod.Id === action.item.Id) === undefined) {
				ordCpy.createOrder.orderItems.push(action.item);
			}

			return ordCpy;
		case orderConstants.SET_ORDER_ITEM_COUNT:
			ordCpy = { ...state };
			let prdId = ordCpy.createOrder.orderItems.findIndex((item) => item.Id === action.id);
			ordCpy.createOrder.orderItems[prdId].Count = action.count;
			return ordCpy;
		case orderConstants.REMOVE_ORDER_ITEM_FROM_SHOPPING_CART:
			ordCpy = { ...state };
			ordCpy.createOrder.orderItems = ordCpy.createOrder.orderItems.filter((item) => item.Id !== action.id);
			return ordCpy;
		default:
			return state;
	}
};
