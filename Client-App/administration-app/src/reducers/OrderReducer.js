import { orderConstants } from "../constants/OrderConstants";

var ordCpy = {};

export const orderReducer = (state, action) => {
	switch (action.type) {
		case orderConstants.ADD_PRODUCT_TO_ORDER:
			ordCpy = { ...state };
			if (ordCpy.createOrder.items.find((item) => item.id === action.item.id) === undefined) {
				ordCpy.createOrder.items.push(action.item);
			}
			return ordCpy;

		case orderConstants.SET_PRODUCT_COUNT_TO_ORDER:
			ordCpy = { ...state };
			let prdIdx = ordCpy.createOrder.items.findIndex((item) => item.id === action.id);
			ordCpy.createOrder.items[prdIdx].count = action.count;
			return ordCpy;

		case orderConstants.REMOVE_PRODUCT_FROM_ORDER:
			ordCpy = { ...state };
			ordCpy.createOrder.items = ordCpy.createOrder.items.filter((item) => item.id !== action.id);
			return ordCpy;

		default:
			return state;
	}
};
