import { objectConstants } from "../constants/ObjectConstants";

let objCpy = {};

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
		case objectConstants.GET_OBJECT_DETAILS_REQUEST:
			objCpy = { ...state };
			objCpy.objectDetails.object = [];

			return objCpy;
		case objectConstants.GET_OBJECT_DETAILS_SUCCESS:
			objCpy = { ...state };
			objCpy.objectDetails.object = action.object;

			return objCpy;
		case objectConstants.GET_OBJECT_DETAILS_FAILURE:
			objCpy = { ...state };
			objCpy.objectDetails.object = [];

			return objCpy;
		default:
			return state;
	}
};
