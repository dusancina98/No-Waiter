import { objectConstants } from "../constants/ObjectConstants";

export const objectReducer = (state, action) => {
	switch (action.type) {
		case objectConstants.FIND_ALL_OBJECTS_REQUEST:
			return {
				...state,
				objects:[],
			};
		case objectConstants.FIND_ALL_OBJECTS_SUCCESS:
			return {
				...state,
				objects:action.objects,
			};
		case objectConstants.FIND_ALL_OBJECTS_FAILURE:
			return {
				...state,
				objects:[],
			};
		default:
			return state;
	}
};
