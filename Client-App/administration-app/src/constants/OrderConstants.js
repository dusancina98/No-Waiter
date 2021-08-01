export const orderConstants = {
	ADD_PRODUCT_TO_ORDER: "ADD_PRODUCT_TO_ORDER",
	REMOVE_PRODUCT_FROM_ORDER: "REMOVE_PRODUCT_FROM_ORDER",
	SET_PRODUCT_COUNT_TO_ORDER: "SET_PRODUCT_COUNT_TO_ORDER",

	SET_CREATE_ORDER_PAGE: "SET_CREATE_ORDER_PAGE",
	CREATE_ORDER_SELECT_TABLE: "CREATE_ORDER_SELECT_TABLE",
	SET_ADDRESS_AND_TIME_CREATE_ORDER: "SET_ADDRESS_AND_TIME_CREATE_ORDER",
	SET_CREATE_ORDER_TYPE: "SET_CREATE_ORDER_TYPE",

	ORDER_CREATE_REQUEST: "ORDER_CREATE_REQUEST",
	ORDER_CREATE_SUCCESS: "ORDER_CREATE_SUCCESS",
	ORDER_CREATE_FAILURE: "ORDER_CREATE_FAILURE",

	HIDE_WAITER_ORDER_ERROR_MESSAGE:"HIDE_WAITER_ORDER_ERROR_MESSAGE",

	GET_UNCONFIRMED_ORDER_SUCCESS:"GET_UNCONFIRMED_ORDER_SUCCESS",
	GET_UNCONFIRMED_ORDER_FAILURE:"GET_UNCONFIRMED_ORDER_FAILURE",

	REJECT_ORDER_SUCCESS:"REJECT_ORDER_SUCCESS",
	REJECT_ORDER_FAILURE:"REJECT_ORDER_FAILURE",

	ACCEPT_UNCONFIRMED_ORDER_ESTIMATED_TIME_FAILURE:"ACCEPT_UNCONFIRMED_ORDER_ESTIMATED_TIME_FAILURE",

	ACCEPT_UNCONFIRMED_ORDER_SUCCESS: "ACCEPT_UNCONFIRMED_ORDER_SUCCESS",
	ACCEPT_UNCONFIRMED_ORDER_FAILURE:"ACCEPT_UNCONFIRMED_ORDER_FAILURE",

	GET_CONFIRMED_ORDER_SUCCESS:"GET_CONFIRMED_ORDER_SUCCESS",
	GET_CONFIRMED_ORDER_FAILURE:"GET_CONFIRMED_ORDER_FAILURE",

	SET_READY_ORDER_SUCCESS:"SET_READY_ORDER_SUCCESS",
	SET_READY_ORDER_FAILURE:"SET_READY_ORDER_FAILURE",

	GET_READY_ORDER_SUCCESS:"GET_READY_ORDER_SUCCESS",
	GET_READY_ORDER_FAILURE:"GET_READY_ORDER_FAILURE",

	SET_ON_ROUTE_ORDER_SUCCESS:"SET_ON_ROUTE_ORDER_SUCCESS",
	SET_ON_ROUTE_ORDER_FAILURE:"SET_ON_ROUTE_ORDER_FAILURE",

	SET_ORDER_TO_COMPLETE_SUCCESS:"SET_ORDER_TO_COMPLETE_SUCCESS",
	SET_ORDER_TO_COMPLETE_FAILURE:"SET_ORDER_TO_COMPLETE_FAILURE",

	GET_ON_ROUTE_ORDERS_SUCCESS:"GET_ON_ROUTE_ORDERS_SUCCESS",
	GET_ON_ROUTE_ORDERS_FAILURE:"GET_ON_ROUTE_ORDERS_FAILURE",

	GET_COMPLETED_ORDERS_SUCCESS:"GET_COMPLETED_ORDERS_SUCCESS",
	GET_COMPLETED_ORDERS_FAILURE:"GET_COMPLETED_ORDERS_FAILURE",

	GET_ORDER_DETAILS_SUCCESS:"GET_ORDER_DETAILS_SUCCESS",
	GET_ORDER_DETAILS_FAILURE:"GET_ORDER_DETAILS_FAILURE",

	REMOVE_PRODUCT_FROM_ORDER_FROM_ORDER_DETAILS:"REMOVE_PRODUCT_FROM_ORDER_FROM_ORDER_DETAILS",
	SET_PRODUCT_COUNT_TO_ORDER_FROM_ORDER_DETAILS:"SET_PRODUCT_COUNT_TO_ORDER_FROM_ORDER_DETAILS",

	WAITER_MODIFY_ORDER_SHOW_ADD_PRODUCT: "WAITER_MODIFY_ORDER_SHOW_ADD_PRODUCT",
	WAITER_MODIFY_ORDER_HIDE_ADD_PRODUCT: "WAITER_MODIFY_ORDER_HIDE_ADD_PRODUCT",
	WAITER_MODIFY_ORDER_SHOW_ADD_PRODUCT_SET_DETAILS: "WAITER_MODIFY_ORDER_SHOW_ADD_PRODUCT_SET_DETAILS",

	ADD_PRODUCT_TO_ORDER_BY_WAITER:"ADD_PRODUCT_TO_ORDER_BY_WAITER",
};
