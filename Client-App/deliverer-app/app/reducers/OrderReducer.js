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

		case orderConstants.SET_PICKED_UP_ORDERS_REQUEST:
			return {
				...state,
				pickedUpOrders: [],
			};
		case orderConstants.SET_PICKED_UP_ORDERS_SUCCESS:
			return {
				...state,
				pickedUpOrders: action.orders,
			};
		case orderConstants.SET_PICKED_UP_ORDERS_FAILURE:
			return {
				...state,
				pickedUpOrders: [],
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

		case orderConstants.DISMISS_ORDER_REQUEST:
			return {
				...state,
				orderDismiss: {
					scannedQr: false,
					showError: false,
					errorMessage: "",
				},
			};
		case orderConstants.DISMISS_ORDER_SUCCESS:
			ordCpy = { ...state };
			//let arOrders = state.pendingOrders.filter((order) => order.OrderId !== action.orderId);
			ordCpy.orderDismiss.scannedQr = true;
			ordCpy.orderDismiss.showError = false;
			ordCpy.orderDismiss.errorMessage = "";
			console.log(ordCpy);
			return ordCpy;
		case orderConstants.DISMISS_ORDER_FAILURE:
			console.log(state);
			return {
				...state,
				orderDismiss: {
					scannedQr: false,
					showError: true,
					errorMessage: action.errorMessage,
				},
			};

		case orderConstants.CANCEL_ORDER_REQUEST:
			return {
				...state,
				orderCancel: {
					success: false,
					showError: false,
					errorMessage: "",
				},
			};
		case orderConstants.CANCEL_ORDER_SUCCESS:
			ordCpy = { ...state };
			ordCpy.acceptedOrders = state.acceptedOrders.filter((order) => order.OrderId !== action.orderId);
			ordCpy.orderCancel.success = true;
			ordCpy.orderCancel.showError = false;
			ordCpy.orderCancel.errorMessage = "";
			console.log(ordCpy);
			return ordCpy;
		case orderConstants.CANCEL_ORDER_FAILURE:
			console.log(state);
			return {
				...state,
				orderCancel: {
					success: false,
					showError: true,
					errorMessage: action.errorMessage,
				},
			};
		default:
			return state;
	}
};
