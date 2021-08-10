import { orderConstants } from "../constants/OrderConstants";
import Axios from "axios";
import { authHeader  } from "../helpers/auth-header";

export const orderService = {
	createOrder,
};

function createOrder(orderDTO, dispatch) {
 	Axios.post(`/order-api/api/orders`, orderDTO, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 201) {
				downloadReport(res.data)
				window.location = "#/finished";
				dispatch(success());
			} else {
				window.location = "#/failure";
				dispatch(failure());
			}
		})		
		.catch((err) => {
			window.location = "#/failure";
			dispatch(failure());
		});
	
	function success() {
		return { type: orderConstants.ORDER_CREATE_SUCCESS };
	}
	function failure() {
		return { type: orderConstants.ORDER_CREATE_FAILURE };
	}
}

function downloadReport(orderId, dispatch) {
	const FileDownload = require("js-file-download");

	Axios.get(`/order-api/api/orders/pdf/` + orderId, { validateStatus: () => true, headers: authHeader() ,responseType: "blob"   })
		.then((response) => {
			FileDownload(response.data, "report.pdf")
		})		
		.catch((err) => {
			dispatch(failure());
		});
	
	function failure() {
		return { type: orderConstants.ORDER_CREATE_FAILURE };
	}
}
