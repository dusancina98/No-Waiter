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
	});

	return <OrderContext.Provider value={{ orderState, dispatch }}>{props.children}</OrderContext.Provider>;
};

export default OrderContextProvider;
