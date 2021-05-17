import Axios from "axios";
import { tableConstants } from "../constants/TableConstants";
import { authHeader } from "../helpers/auth-header";

export const tableService = {
	createTable,
	findAll,
	deleteTable,
};

function createTable(dispatch) {
	dispatch(request());

	Axios.post(`/object-api/api/objects/tables`, {}, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 201) {
				dispatch(success(res.data, "Table successfully added"));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: tableConstants.TABLE_CREATE_REQUEST };
	}
	function success(table, message) {
		return { type: tableConstants.TABLE_CREATE_SUCCESS, table, successMessage: message };
	}
	function failure(message) {
		return { type: tableConstants.TABLE_DELETE_FAILURE, errorMessage: message };
	}
}

function deleteTable(tableId, dispatch) {
	dispatch(request());

	Axios.delete(`/object-api/api/objects/tables/${tableId}`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success("Table successfully deleted"));
			} else {
				dispatch(failure(res.data.message));
			}
		})
		.catch((err) => {
			console.log(err);
		});

	function request() {
		return { type: tableConstants.TABLE_DELETE_REQUEST };
	}
	function success(message) {
		return { type: tableConstants.TABLE_DELETE_SUCCESS, successMessage: message, tableId };
	}
	function failure(message) {
		return { type: tableConstants.TABLE_DELETE_FAILURE, errorMessage: message };
	}
}

async function findAll(dispatch) {
	dispatch(request());

	await Axios.get(`/object-api/api/objects/tables`, { validateStatus: () => true, headers: authHeader() })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: tableConstants.SET_TABLES_REQUEST };
	}
	function success(data) {
		return { type: tableConstants.SET_TABLES_SUCCESS, tables: data };
	}
	function failure(message) {
		return { type: tableConstants.SET_TABLET_ERROR, errorMessage: message };
	}
}
