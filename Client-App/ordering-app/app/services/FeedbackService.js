import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { feedbackConstants } from "../constants/FeedbackConstants";
import { authHeader } from "../helpers/auth-header";

export const feedbackService = {
	rateDeliverer,
	rateObject,
};

async function rateObject(feedbackDTO, dispatch) {
	dispatch(request());

	console.log(feedbackDTO);

	let header = await authHeader();

	Axios.post(`${API_URL}/feedback-api/api/feedbacks/object`, feedbackDTO, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res);
			if (res.status === 201) {
				dispatch(success());
			} else {
				dispatch(failure("Feedback already created"));
			}
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: feedbackConstants.RATE_OBJECT_REQUEST };
	}
	function success() {
		return { type: feedbackConstants.RATE_OBJECT_SUCCESS };
	}
	function failure(error) {
		return { type: feedbackConstants.RATE_OBJECT_FAILURE, errorMessage: error };
	}
}

async function rateDeliverer(feedbackDTO, dispatch) {
	dispatch(request());

	console.log(feedbackDTO);

	let header = await authHeader();

	Axios.post(`${API_URL}/feedback-api/api/feedbacks/deliverer`, feedbackDTO, { validateStatus: () => true, headers: header })
		.then((res) => {
			console.log(res);
			if (res.status === 201) {
				dispatch(success());
			} else {
				dispatch(failure("Feedback already created"));
			}
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: feedbackConstants.RATE_DELIVERER_REQUEST };
	}
	function success() {
		return { type: feedbackConstants.RATE_DELIVERER_SUCCESS };
	}
	function failure(error) {
		return { type: feedbackConstants.RATE_DELIVERER_FAILURE, errorMessage: error };
	}
}
