import { objectConstants } from "../constants/ObjectConstants";

export const objectReducer = (state, action) => {
	switch (action.type) {
		case objectConstants.OBJECT_CREATE_REQUEST:
			return {
				...state,
				createObject: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case objectConstants.OBJECT_CREATE_SUCCESS:
			return {
				...state,
				createObject: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
			};
		case objectConstants.OBJECT_CREATE_FAILURE:
			return {
				...state,
				createObject: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
				},
			};
		case objectConstants.SET_OBJECTS_REQUEST:
			return {
				...state,
				showError: false,
				errorMessage: "",
				objects: [],
			};
		case objectConstants.SET_OBJECTS_SUCCESS:
			return {
				...state,
				showError: false,
				errorMessage: "",
				objects: action.objects,
			};
		case objectConstants.SET_OBJECTS_ERROR:
			return {
				...state,
				showError: true,
				errorMessage: action.errorMessage,
				objects: [],
			};

		default:
			return state;
	}
};
