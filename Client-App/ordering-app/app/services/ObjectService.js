import Axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { objectConstants } from "../constants/ObjectConstants";

export const objectService = {
	findAllObjects,
};

function findAllObjects(dispatch) {
	dispatch(request());

	Axios.get(`${API_URL}/object-api/api/objects`, { validateStatus: () => true })
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("We have some problem"));
			}
		})
		.catch((err) => {
			console.error(err);
		});	

	function request() {
		return { type: objectConstants.FIND_ALL_OBJECTS_REQUEST };
	}
	function success(objects) {
		return { type: objectConstants.FIND_ALL_OBJECTS_SUCCESS, objects };
	}
	function failure(error) {
		return { type: objectConstants.FIND_ALL_OBJECTS_FAILURE, error };
	}
}

