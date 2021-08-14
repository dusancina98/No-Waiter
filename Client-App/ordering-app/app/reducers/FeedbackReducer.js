import { feedbackConstants } from "../constants/FeedbackConstants";

let fbckCpy = {};

export const feedbackReducer = (state, action) => {
	switch (action.type) {
		case feedbackConstants.RATE_DELIVERER_REQUEST:
			return {
				...state,
				rateDeliverer: {
					showError: false,
					errorMessage: "",
					success: false,
				},
			};
		case feedbackConstants.RATE_DELIVERER_SUCCESS:
			return {
				...state,
				rateDeliverer: {
					showError: false,
					errorMessage: "",
					success: true,
				},
			};
		case feedbackConstants.RATE_DELIVERER_FAILURE:
			return {
				...state,
				rateDeliverer: {
					showError: true,
					errorMessage: action.errorMessage,
					success: false,
				},
			};
		case feedbackConstants.RATE_OBJECT_REQUEST:
			return {
				...state,
				rateObject: {
					showError: false,
					errorMessage: "",
					success: false,
				},
			};
		case feedbackConstants.RATE_OBJECT_SUCCESS:
			return {
				...state,
				rateObject: {
					showError: false,
					errorMessage: "",
					success: true,
				},
			};
		case feedbackConstants.RATE_OBJECT_FAILURE:
			return {
				...state,
				rateObject: {
					showError: true,
					errorMessage: action.errorMessage,
					success: false,
				},
			};
		default:
			return state;
	}
};
