import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { orderConstants } from "../constants/OrderConstants";
import { authHeader } from "../helpers/auth-header";

export const orderService = {
	createOrder,
};

async function createOrder(orderDTO, dispatch) {
	dispatch(request());

	let header = await authHeader();

	Axios.post(`${API_URL}/order-api/api/orders/customer`, orderDTO, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res);
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
