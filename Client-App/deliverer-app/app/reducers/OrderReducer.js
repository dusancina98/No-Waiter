import { orderConstants } from "../constants/OrderConstants";

let ordCpy = {};

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

		case orderConstants.SET_ACCEPTED_ORDERS_REQUEST:
			return {
				...state,
				acceptedOrders: [],
			};
		case orderConstants.SET_ACCEPTED_ORDERS_SUCCESS:
			return {
				...state,
				acceptedOrders: action.orders,
			};
		case orderConstants.SET_ACCEPTED_ORDERS_FAILURE:
			return {
				...state,
				acceptedOrders: [],
			};

		case orderConstants.ACCEPT_ORDER_REQUEST:
			return {
				...state,
				orderAccept: {
					accepted: false,
				},
			};
		case orderConstants.ACCEPT_ORDER_SUCCESS:
			ordCpy = { ...state };
			let arOrders = state.pendingOrders.filter((order) => order.OrderId !== action.orderId);
			ordCpy.pendingOrders = arOrders;
			ordCpy.orderAccept.accepted = true;
			console.log(ordCpy);
			return ordCpy;
		case orderConstants.ACCEPT_ORDER_FAILURE:
			return {
				...state,
				orderAccept: {
					accepted: false,
				},
			};

		case orderConstants.PICKUP_ORDER_REQUEST:
			return {
				...state,
				orderDelivering: {
					scannedQr: false,
					showError: false,
					errorMessage: "",
				},
			};
		case orderConstants.PICKUP_ORDER_SUCCESS:
			ordCpy = { ...state };
			//let arOrders = state.pendingOrders.filter((order) => order.OrderId !== action.orderId);
			ordCpy.orderDelivering.scannedQr = true;
			ordCpy.orderDelivering.showError = false;
			ordCpy.orderDelivering.errorMessage = "";
			return ordCpy;
		case orderConstants.PICKUP_ORDER_FAILURE:
			return {
				...state,
				orderDelivering: {
					scannedQr: false,
					showError: true,
					errorMessage: action.errorMessage,
				},
			};
		default:
			return state;
	}
};
