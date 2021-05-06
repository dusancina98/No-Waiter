import { objectConstants } from "../constants/ObjectConstants";

export const objectReducer = (state, action) => {
	switch (action.type) {
		case objectConstants.OBJECT_CREATE_REQUEST:
			return {
				createObject: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case objectConstants.OBJECT_CREATE_SUCCESS:
			return {
				createObject: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
			};
		case objectConstants.OBJECT_CREATE_FAILURE:
			return {
				createObject: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
				},
			};
		default:
			return state;
	}
};
