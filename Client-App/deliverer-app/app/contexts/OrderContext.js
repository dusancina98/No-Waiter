import React, { createContext, useReducer } from "react";
import { orderReducer } from "../reducers/OrderReducer";

export const OrderContext = createContext();

const OrderContextProvider = (props) => {
	const [orderState, dispatch] = useReducer(orderReducer, {
		pendingOrders: [],
		acceptedOrders: [],
		pickedUpOrders: [],
		orderAccept: {
			accepted: false,
		},
		orderDelivering: {
			scannedQr: false,
			showError: false,
			errorMessage: "",
		},
		orderDismiss: {
			scannedQr: false,
			showError: false,
			errorMessage: "",
		},
		orderCancel: {
			success: false,
			showError: false,
			errorMessage: "",
		},
	});

	return <OrderContext.Provider value={{ orderState, dispatch }}>{props.children}</OrderContext.Provider>;
};

export default OrderContextProvider;
