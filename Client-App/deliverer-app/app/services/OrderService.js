import { authHeader } from "../helpers/auth-header";
import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { orderConstants } from "../constants/OrderConstants";

export const orderService = {
	getAllConfirmedOrders,
	getAllAcceptedOrders,
	getAllPickedUpOrders,
	confirmOrder,
	pickupOrder,
	dismissOrder,
	cancelOrder,
};

async function getAllPickedUpOrders(dispatch) {
	dispatch(request());

	let header = await authHeader();

	await Axios.get(`${API_URL}/order-api/api/orders/delivering/deliverer`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: orderConstants.SET_PICKED_UP_ORDERS_REQUEST };
	}
	function success(orders) {
		return { type: orderConstants.SET_PICKED_UP_ORDERS_SUCCESS, orders };
	}
	function failure(error) {
		return { type: orderConstants.SET_PICKED_UP_ORDERS_FAILURE, error };
	}
}

async function getAllAcceptedOrders(dispatch) {
	dispatch(request());

	let header = await authHeader();

	await Axios.get(`${API_URL}/order-api/api/orders/accepted/deliverer`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: orderConstants.SET_ACCEPTED_ORDERS_REQUEST };
	}
	function success(orders) {
		return { type: orderConstants.SET_ACCEPTED_ORDERS_SUCCESS, orders };
	}
	function failure(error) {
		return { type: orderConstants.SET_ACCEPTED_ORDERS_FAILURE, error };
	}
}

async function getAllConfirmedOrders(dispatch) {
	dispatch(request());

	let header = await authHeader();

	await Axios.get(`${API_URL}/order-api/api/orders/confirmed/deliverer`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: orderConstants.SET_PENDING_ORDERS_REQUEST };
	}
	function success(orders) {
		return { type: orderConstants.SET_PENDING_ORDERS_SUCCESS, orders };
	}
	function failure(error) {
		return { type: orderConstants.SET_PENDING_ORDERS_FAILURE, error };
	}
}

async function confirmOrder(orderDTO, dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.put(`${API_URL}/order-api/api/orders/accept/deliverer`, orderDTO, { validateStatus: () => true, headers: header })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(orderDTO.OrderId));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.error(err);
		});

	function request() {
		return { type: orderConstants.ACCEPT_ORDER_REQUEST };
	}
	function success(orderId) {
		return { type: orderConstants.ACCEPT_ORDER_SUCCESS, orderId };
	}
	function failure(error) {
		return { type: orderConstants.ACCEPT_ORDER_FAILURE, error };
	}
}

async function pickupOrder(orderId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.put(`${API_URL}/order-api/api/orders/${orderId}/delivering`, null, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res.data);
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

	function request() {
		return { type: orderConstants.PICKUP_ORDER_REQUEST };
	}
	function success(orderId) {
		return { type: orderConstants.PICKUP_ORDER_SUCCESS, orderId };
	}
	function failure(error) {
		return { type: orderConstants.PICKUP_ORDER_FAILURE, errorMessage: error };
	}
}

async function dismissOrder(orderId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.put(`${API_URL}/order-api/api/orders/${orderId}/dismiss`, null, { validateStatus: () => true, headers: header })
		.then((res) => {
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

	function request() {
		return { type: orderConstants.DISMISS_ORDER_REQUEST };
	}
	function success(orderId) {
		return { type: orderConstants.DISMISS_ORDER_SUCCESS, orderId };
	}
	function failure(error) {
		return { type: orderConstants.DISMISS_ORDER_FAILURE, errorMessage: error };
	}
}

async function cancelOrder(orderId, dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.put(`${API_URL}/order-api/api/orders/${orderId}/cancel`, null, { validateStatus: () => true, headers: header })
		.then((res) => {
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

	function request() {
		return { type: orderConstants.CANCEL_ORDER_REQUEST };
	}
	function success(orderId) {
		return { type: orderConstants.CANCEL_ORDER_SUCCESS, orderId };
	}
	function failure(error) {
		return { type: orderConstants.CANCEL_ORDER_FAILURE, errorMessage: error };
	}
}
