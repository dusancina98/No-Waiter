import { orderConstants } from "../constants/OrderConstants";

export const orderReducer = (state, action) => {
	switch (action.type) {
		case orderConstants.SET_PENDING_ORDERS_REQUEST:
			return {
				...state,
				pendingOrders: [],
			};
		case orderConstants.SET_PENDING_ORDERS_SUCCESS:
			return {
				...state,
				pendingOrders: action.orders,
			};
		case orderConstants.SET_PENDING_ORDERS_FAILURE:
			return {
				...state,
				pendingOrders: [],
			};
		default:
			return state;
	}
};
