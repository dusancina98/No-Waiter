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
		default:
			return state;
	}
};
