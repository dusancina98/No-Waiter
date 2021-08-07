import { authHeader } from "../helpers/auth-header";
import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { orderConstants } from "../constants/OrderConstants";

export const orderService = {
	getAllConfirmedOrders,
};

async function getAllConfirmedOrders(dispatch) {
	dispatch(request());

	let header = await authHeader();

	await Axios.get(`${API_URL}/order-api/api/orders/confirmed/deliverer`, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res);
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
