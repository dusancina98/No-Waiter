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
		case orderConstants.GET_CONFIRMED_ORDER_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.ConfirmedOrders = action.orders;
	
			return ordCpy;
		case orderConstants.GET_CONFIRMED_ORDER_FAILURE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.ConfirmedOrders = [];
			return ordCpy;

		case orderConstants.REJECT_ORDER_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.UnConfirmedOrders = ordCpy.waiterOrders.UnConfirmedOrders.filter((item) => item.OrderId !== action.orderId);
			ordCpy.waiterOrders.ConfirmedOrders = ordCpy.waiterOrders.ConfirmedOrders.filter((item) => item.OrderId !== action.orderId);
			ordCpy.waiterOrders.ReadyOrders = ordCpy.waiterOrders.ReadyOrders.filter((item) => item.OrderId !== action.orderId);
			ordCpy.waiterOrders.OnRouteOrders = ordCpy.waiterOrders.OnRouteOrders.filter((item) => item.OrderId !== action.orderId);
			return ordCpy;
		case orderConstants.REJECT_ORDER_FAILURE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.showErrorMessage=true;
			ordCpy.waiterOrders.errorMessage=action.errorMessage;
			return ordCpy;
		case orderConstants.HIDE_WAITER_ORDER_ERROR_MESSAGE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.showErrorMessage=false;
			ordCpy.waiterOrders.errorMessage='';
			return ordCpy;			
		case modalConstants.SHOW_ACCEPT_UNCONFIRMED_ORDER_MODAL:
			return {
				...state,
				acceptUnConfirmedOrder:{
					orderId: action.orderId,
					showModal:true, 
					showErrorMessage:false,
					errorMessage:'',
				}
			}
		case modalConstants.HIDE_ACCEPT_UNCONFIRMED_ORDER_MODAL:
			return {
				...state,
				acceptUnConfirmedOrder:{
					showModal:false, 
					orderId: '',
					showErrorMessage:false,
					errorMessage:'',
				}
			}
		case orderConstants.ACCEPT_UNCONFIRMED_ORDER_ESTIMATED_TIME_FAILURE:
			return {
				...state,
				acceptUnConfirmedOrder:{
					orderId: '',
					showModal:true, 
					showErrorMessage:true,
					errorMessage:action.errorMessage,
				}
			}
		case orderConstants.ACCEPT_UNCONFIRMED_ORDER_REQUEST:
			return {
				...state,
				acceptUnConfirmedOrder:{
					orderId: '',
					showModal:true, 
					showErrorMessage:false,
					errorMessage:'',
				}
			}
		case orderConstants.ACCEPT_UNCONFIRMED_ORDER_SUCCESS:
			ordCpy = { ...state };
			ordCpy.acceptUnConfirmedOrder.showModal = false
			ordCpy.waiterOrders.UnConfirmedOrders = ordCpy.waiterOrders.UnConfirmedOrders.filter((item) => item.OrderId !== action.orderId);
			return ordCpy;
		case orderConstants.ACCEPT_UNCONFIRMED_ORDER_FAILURE:
			return {
				...state,
				acceptUnConfirmedOrder:{
					orderId: '',
					showModal:true, 
					showErrorMessage:true,
					errorMessage:action.errorMessage,
				}
			}
		case orderConstants.SHOW_WAITER_ORDERS_REQUEST:
			ordCpy = { ...state };
			ordCpy.waiterOrders.showErrorMessage=false;
			ordCpy.waiterOrders.errorMessage='';
			return ordCpy;
		case orderConstants.SET_READY_ORDER_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.ConfirmedOrders = ordCpy.waiterOrders.ConfirmedOrders.filter((item) => item.OrderId !== action.orderId);
			return ordCpy;
		case orderConstants.SET_READY_ORDER_FAILURE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.showErrorMessage=true;
			ordCpy.waiterOrders.errorMessage=action.errorMessage;
			return ordCpy;
		case orderConstants.GET_READY_ORDER_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.ReadyOrders = action.orders;
	
			return ordCpy;
		case orderConstants.GET_READY_ORDER_FAILURE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.ReadyOrders = [];
			return ordCpy;
		case orderConstants.SET_ON_ROUTE_ORDER_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.ReadyOrders = ordCpy.waiterOrders.ReadyOrders.filter((item) => item.OrderId !== action.orderId);
			return ordCpy;
		case orderConstants.SET_ON_ROUTE_ORDER_FAILURE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.showErrorMessage=true;
			ordCpy.waiterOrders.errorMessage=action.errorMessage;
			return ordCpy;
		case orderConstants.SET_ORDER_TO_COMPLETE_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.ReadyOrders = ordCpy.waiterOrders.ReadyOrders.filter((item) => item.OrderId !== action.orderId);
			ordCpy.waiterOrders.OnRouteOrders = ordCpy.waiterOrders.OnRouteOrders.filter((item) => item.OrderId !== action.orderId);
			return ordCpy;
		case orderConstants.SET_ORDER_TO_COMPLETE_FAILURE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.showErrorMessage=true;
			ordCpy.waiterOrders.errorMessage=action.errorMessage;
			return ordCpy;
		case orderConstants.GET_ON_ROUTE_ORDERS_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.OnRouteOrders = action.orders;
	
			return ordCpy;
		case orderConstants.GET_ON_ROUTE_ORDERS_FAILURE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.OnRouteOrders = [];
			return ordCpy;
		case orderConstants.GET_COMPLETED_ORDERS_SUCCESS:
			ordCpy = { ...state };
			ordCpy.waiterOrders.CompletedOrders = action.orders;
	
			return ordCpy;
		case orderConstants.GET_COMPLETED_ORDERS_FAILURE:
			ordCpy = { ...state };
			ordCpy.waiterOrders.CompletedOrders = [];
			return ordCpy;
		case modalConstants.HIDE_ORDER_DETAILS_MODAL:
			ordCpy = { ...state };
			
			ordCpy.orderDetailsModal.showModal = false;
			ordCpy.orderDetailsModal.order = [];
			ordCpy.orderDetailsModal.orderId = '';

			return ordCpy;
		case modalConstants.SHOW_ORDER_DETAILS_MODAL:
			return {
				...state,
				orderDetailsModal: {
					showModal: true,
					orderId: action.orderId,
					order: [],
					showAddProduct: false,
				showAddProductDetails: false,
				}
			}
		case orderConstants.GET_ORDER_DETAILS_SUCCESS:
			return {
				...state,
				orderDetailsModal: {
					showModal: true,
					orderId: action.orderId,
					order: action.orderDetails,
					showAddProduct: false,
				showAddProductDetails: false,
				}
			}
		case orderConstants.GET_ORDER_DETAILS_FAILURE:
			return {
				...state,
				orderDetailsModal: {
					showModal: true,
					orderId: '',
					order: [],
					showAddProduct: false,
				showAddProductDetails: false,
				}
			}
		case orderConstants.REMOVE_PRODUCT_FROM_ORDER_FROM_ORDER_DETAILS:
			ordCpy = { ...state };
			ordCpy.orderDetailsModal.order.OrderItems = ordCpy.orderDetailsModal.order.OrderItems.filter((item) => item.Id !== action.id);
			return ordCpy;
		case orderConstants.SET_PRODUCT_COUNT_TO_ORDER_FROM_ORDER_DETAILS:
			ordCpy = { ...state };
			let prdId = ordCpy.orderDetailsModal.order.OrderItems.findIndex((item) => item.Id === action.id);
			ordCpy.orderDetailsModal.order.OrderItems[prdId].Count = action.count;
			return ordCpy;
		case orderConstants.WAITER_MODIFY_ORDER_SHOW_ADD_PRODUCT:
			ordCpy = { ...state };
			ordCpy.orderDetailsModal.showAddProduct = true;
			ordCpy.orderDetailsModal.showAddProductDetails = false;
			return ordCpy;
		case orderConstants.WAITER_MODIFY_ORDER_SHOW_ADD_PRODUCT_SET_DETAILS:
			ordCpy = { ...state };
			ordCpy.orderDetailsModal.showAddProduct = true;
			ordCpy.orderDetailsModal.showAddProductDetails = true;
			ordCpy.orderDetailsModal.addProductDetails = action.product;
			return ordCpy;
		case orderConstants.WAITER_MODIFY_ORDER_HIDE_ADD_PRODUCT:
			ordCpy = { ...state };
			ordCpy.orderDetailsModal.showAddProduct = false;
			ordCpy.orderDetailsModal.showAddProductDetails = false;

			return ordCpy;

		case orderConstants.ADD_PRODUCT_TO_ORDER_BY_WAITER:
			ordCpy = { ...state };

			if (ordCpy.orderDetailsModal.order.OrderItems.find((prod) => prod.Id === action.item.Id) === undefined) {
				ordCpy.orderDetailsModal.order.OrderItems.push(action.item);
			}

			ordCpy.orderDetailsModal.showAddProduct = true;
			ordCpy.orderDetailsModal.showAddProductDetails = false;

			return ordCpy;
		case orderConstants.EDIT_ORDER_INFROMATION_BY_WAITER:
			ordCpy = { ...state };
			if(action.orderType!==''){
				ordCpy.orderDetailsModal.order.OrderType=action.orderType;
			}

			if(action.address!==''){
				ordCpy.orderDetailsModal.order.Address=action.address;
			}

			if(action.table!==''){
				ordCpy.orderDetailsModal.order.Table=action.table;
			}

			return ordCpy;
		default:
			return state;
	}
};
