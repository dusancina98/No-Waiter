import React, { createContext, useReducer } from "react";
import { orderReducer } from "../reducers/OrderReducer";

export const OrderContext = createContext();

const OrderContextProvider = (props) => {
	const [orderState, dispatch] = useReducer(orderReducer, {
		createOrder: {
			selectedAddress: {
				Id: "",
				EntityDTO: {
					Name: "",
				},
			},
			address: "",
			items: [],
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
			successMessage: "",
		},
		qrCodeData: {
			scanned: false,
			tableId: "",
			objectId: "",
			key: "",
		},
		orderHistory: {
			orders: [],
			showError: false,
			errorMessage: "",
		},
		pendingOrders: {
			orders: [],
			showError: false,
			errorMessage: "",
		},
		scanQRCode: {
			scannedQr: false,
			showError: false,
			errorMessage: "",
			delivererId: "",
		},
	});

	return <OrderContext.Provider value={{ orderState, dispatch }}>{props.children}</OrderContext.Provider>;
};

export default OrderContextProvider;
