import { orderConstants } from "../constants/OrderConstants";
import Axios from "axios";
import { authHeader } from "../helpers/auth-header";

export const orderService = {
	createOrder,
	findAllUnConfirmedOrders,
	rejectOrder,
	acceptUnConfirmedOrder,
	findAllConfirmedOrders,
	readyOrder,
};

function createOrder(orderDTO, dispatch) {
	dispatch(request());

	Axios.post(`/order-api/api/orders`, orderDTO, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 201) {
				dispatch(success("Order successfully created"));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: orderConstants.ORDER_CREATE_REQUEST };
	}
	function success(message) {
		return { type: orderConstants.ORDER_CREATE_SUCCESS, successMessage: message };
	}
	function failure(message) {
		return { type: orderConstants.ORDER_CREATE_FAILURE, errorMessage: message };
	}
}

async function findAllUnConfirmedOrders(dispatch){

	await Axios.get(`/order-api/api/orders/unconfirmed`, { validateStatus: () => true, headers: authHeader() })
	.then((res) => {
		console.log(res);
		if (res.status === 200) {
			dispatch(success(res.data));
		} else {
			dispatch(failure("Error"));
		}
	})
	.catch((err) => {
		dispatch(failure("Error"));
	});

	function success(data) {
		return { type: orderConstants.GET_UNCONFIRMED_ORDER_SUCCESS, orders: data };
	}
	function failure(message) {
		return { type: orderConstants.GET_UNCONFIRMED_ORDER_FAILURE, errorMessage: message };
	}
}

function rejectOrder(orderId, dispatch) {
	Axios.put(`/order-api/api/orders/${orderId}/reject`, null, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(orderId));
			} else {
				dispatch(failure('We have some internal problem, please try later'));
			}
		})
		.catch((err) => {
			dispatch(failure('We have some internal problem, please try later'));
		});

	function success(orderId) {
		return { type: orderConstants.REJECT_ORDER_SUCCESS, orderId: orderId };
	}
	function failure(message) {
		return { type: orderConstants.REJECT_ORDER_FAILURE, errorMessage: message };
	}
}

function acceptUnConfirmedOrder(acceptOrderDTO, dispatch) {
	Axios.put(`/order-api/api/orders/accept`, acceptOrderDTO, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(acceptOrderDTO.OrderId));
				findAllConfirmedOrders(dispatch)
			} else {
				dispatch(failure('We have some internal problem, please try later'));
			}
		})
		.catch((err) => {
			console.log(failure('We have some internal problem, please try later'));
		});

	function success(orderId) {
		return { type: orderConstants.ACCEPT_UNCONFIRMED_ORDER_SUCCESS, orderId: orderId };
	}
	function failure(message) {
		return { type: orderConstants.ACCEPT_UNCONFIRMED_ORDER_FAILURE, errorMessage: message };
	}
}

async function findAllConfirmedOrders(dispatch){

	await Axios.get(`/order-api/api/orders/confirmed`, { validateStatus: () => true, headers: authHeader() })
	.then((res) => {
		console.log(res);
		if (res.status === 200) {
			dispatch(success(res.data));
		} else {
			dispatch(failure("Error"));
		}
	})
	.catch((err) => {
		dispatch(failure("Error"));
	});

	function success(data) {
		return { type: orderConstants.GET_CONFIRMED_ORDER_SUCCESS, orders: data };
	}
	function failure(message) {
		return { type: orderConstants.GET_CONFIRMED_ORDER_FAILURE, errorMessage: message };
	}
}

function readyOrder(orderId, dispatch) {
	Axios.put(`/order-api/api/orders/${orderId}/ready`, null, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(orderId));
			} else {
				dispatch(failure('We have some internal problem, please try later'));
			}
		})
		.catch((err) => {
			dispatch(failure('We have some internal problem, please try later'));
		});
	
	function success(orderId) {
		return { type: orderConstants.READY_ORDER_SUCCESS, orderId: orderId };
	}
	function failure(message) {
		return { type: orderConstants.READY_ORDER_FAILURE, errorMessage: message };
	}
}