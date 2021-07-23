import { modalConstants } from "../constants/ModalConstants";
import { orderConstants } from "../constants/OrderConstants";

var ordCpy = {};

export const orderReducer = (state, action) => {
	switch (action.type) {
		case orderConstants.ADD_PRODUCT_TO_ORDER:
			ordCpy = { ...state };
			ordCpy.createOrder.items.push(action.item);

			ordCpy.orderItemDetails = {
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
			};

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

		case modalConstants.SHOW_ORDER_ITEM_DETAILS_MODAL:
			return {
				...state,
				orderItemDetails: {
					showModal: true,
					selectedProduct: action.product,
				},
			};
		case modalConstants.HIDE_ORDER_ITEM_DETAILS_MODAL:
			return {
				...state,
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
			};

		case orderConstants.SET_CREATE_ORDER_TYPE:
			ordCpy = { ...state };
			if (action.page === 3) {
				ordCpy.loadTables = !ordCpy.loadTables;
				ordCpy.orderType = "ORDER_INSIDE";
			} else if (action.page === 4) {
				ordCpy.orderType = "DELIVERY";
			} else if (action.page === 6) {
				ordCpy.orderType = "TAKEOVER";
			}
			ordCpy.createOrder.pageVisible = action.page;
			return ordCpy;

		case orderConstants.SET_CREATE_ORDER_PAGE:
			ordCpy = { ...state };
			if (action.page === 3) {
				ordCpy.loadTables = !ordCpy.loadTables;
			} else if (action.page === 2) {
				ordCpy.selectedTable = {
					id: "",
					number: "",
				};
				ordCpy.deliveryInfo = {
					estimatedTime: "",
					address: "",
				};
			}
			ordCpy.createOrder.pageVisible = action.page;
			return ordCpy;

		case orderConstants.CREATE_ORDER_SELECT_TABLE:
			ordCpy = { ...state };
			ordCpy.selectedTable = action.table;
			ordCpy.createOrder.pageVisible = 6;

			return ordCpy;

		case orderConstants.SET_ADDRESS_AND_TIME_CREATE_ORDER:
			ordCpy = { ...state };
			ordCpy.deliveryInfo = action.delivery;
			ordCpy.createOrder.pageVisible = action.page;

			return ordCpy;

		case orderConstants.GET_UNCONFIRMED_ORDER_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.UnConfirmedOrders = action.orders;
	
			return ordCpy;
		case orderConstants.GET_UNCONFIRMED_ORDER_FAILURE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.UnConfirmedOrders = [];
	
			return ordCpy;
		case orderConstants.REJECT_ORDER_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.UnConfirmedOrders = ordCpy.waiterOrders.UnConfirmedOrders.filter((item) => item.OrderId !== action.orderId);
			return ordCpy;
		case orderConstants.REJECT_ORDER_FAILURE:
			ordCpy = { ...state };
			return ordCpy;
		default:
			return state;
	}
};
