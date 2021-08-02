import { orderConstants } from "../constants/OrderConstants";
import Axios from "axios";

export const orderService = {
	createOrder,
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