import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { orderConstants } from "../constants/OrderConstants";
import { authHeader } from "../helpers/auth-header";

export const orderService = {
	createOrder,
	getOrderHistory,
	getPendingOrders,
	receiveOrder,
	rejectOrder,
};

async function receiveOrder(orderId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.put(`${API_URL}/order-api/api/orders/${orderId}/completed/customer`, null, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else if (res.status === 404) {
				dispatch(failure("Order not found"));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: orderConstants.RECEIVE_ORDER_REQUEST };
	}
	function success(delivererId) {
		return { type: orderConstants.RECEIVE_ORDER_SUCCESS, delivererId };
	}
	function failure(error) {
		return { type: orderConstants.RECEIVE_ORDER_FAILURE, errorMessage: error };
	}
}

async function createOrder(orderDTO, dispatch) {
	let header = await authHeader();

	Axios.post(`${API_URL}/order-api/api/orders/customer`, orderDTO, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res);
			if (res.status === 201) {
				dispatch(success("Order successfully created"));
			} else if(res.status===403){
				dispatch(failure("Your account is blocked"));
			}else {
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

async function getOrderHistory(dispatch) {
	let header = await authHeader();

	await Axios.get(`${API_URL}/order-api/api/orders/customer/history`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("We have some problem"));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function success(orders) {
		return { type: orderConstants.GET_ORDER_HISTORY_SUCCESS, orders };
	}
	function failure(error) {
		return { type: orderConstants.GET_ORDER_HISTORY_FAILURE, error };
	}
}

async function getPendingOrders(dispatch) {
	let header = await authHeader();

	await Axios.get(`${API_URL}/order-api/api/orders/customer/pending`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
				//dispatch(failure("We have some problem"));
			} else {
				dispatch(failure("We have some problem"));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function success(orders) {
		return { type: orderConstants.GET_PENDING_ORDERS_SUCCESS, orders };
	}
	function failure(error) {
		return { type: orderConstants.GET_PENDING_ORDERS_FAILURE, error };
	}
}

async function rejectOrder(orderId,dispatch){
	let header = await authHeader();

	Axios.put(`${API_URL}/order-api/api/orders/${orderId}/reject`, null, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				dispatch(success(orderId));
			} else if (res.status === 404) {
				dispatch(failure("Order not found"));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function success(orderId) {
		return { type: orderConstants.REJECT_ORDER_SUCCESS, orderId };
	}
	function failure(error) {
		return { type: orderConstants.REJECT_ORDER_FAILURE, errorMessage: error };
	}
}