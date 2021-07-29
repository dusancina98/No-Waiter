import { createContext, useReducer } from "react";
import { orderReducer } from "../reducers/OrderReducer";

export const OrderContext = createContext();

const OrderContextProvider = (props) => {
	const [orderState, dispatch] = useReducer(orderReducer, {
		createOrder: {
			pageVisible: 1,
			items: [],
		},
		loadTables: false,
		orderType: "",
		selectedTable: {
			id: "",
			number: "",
		},
		deliveryInfo: {
			estimatedTime: "",
			address: "",
		},
		orderItemDetails: {
			showModal: false,
			selectedProduct: {
				Id: "",
				EntityDTO: {
					Name: "",
					Image: "",
					Ingredients: [],
					MeasureUnit: "",
					Price: 0,
					SideDishes: [],
				},
			},
		},
		waiterOrders: {
			UnConfirmedOrders: [],
			ConfirmedOrders: [],
			ReadyOrders: [],
			OnRouteOrders: [],
			CompletedOrders: [],
			showErrorMessage:false,
			errorMessage:'',
		},
		acceptUnConfirmedOrder:{
			orderId:'',
			showModal:false, 
			showErrorMessage:false,
			errorMessage:'',
		},
		orderDetails: {
			showModal: false,
			orderId: '', 
			order: [],
		}
	});

	return <OrderContext.Provider value={{ orderState, dispatch }}>{props.children}</OrderContext.Provider>;
};

export default OrderContextProvider;
