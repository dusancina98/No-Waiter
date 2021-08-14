import React, { createContext, useReducer } from "react";
import { feedbackReducer } from "../reducers/FeedbackReducer";

export const FeedbackContext = createContext();

const FeedbackContextProvider = (props) => {
	const [feedbackState, dispatch] = useReducer(feedbackReducer, {
		rateDeliverer: {
			showError: false,
			errorMessage: "",
			success: false,
		},
		rateObject: {
			showError: false,
			errorMessage: "",
			success: false,
		},
	});

	return <FeedbackContext.Provider value={{ feedbackState, dispatch }}>{props.children}</FeedbackContext.Provider>;
};

export default FeedbackContextProvider;
