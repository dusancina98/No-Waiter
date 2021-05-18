import { tableConstants } from "../constants/TableConstants";

export const tableReducer = (state, action) => {
	switch (action.type) {
		case tableConstants.TABLE_CREATE_REQUEST:
			return {
				...state,
				crudTable: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
					successMessage: "",
				},
			};
		case tableConstants.TABLE_CREATE_SUCCESS:
			let arrTables = [...state.tables];
			arrTables.push(action.table);
			return {
				...state,
				crudTable: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
					successMessage: action.successMessage,
				},
				tables: arrTables,
			};
		case tableConstants.TABLE_CREATE_FAILURE:
			return {
				...state,
				crudTable: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
					successMessage: "",
				},
			};
		case tableConstants.SET_TABLES_REQUEST:
			return { ...state, tables: [], showError: false, errorMessage: "" };
		case tableConstants.SET_TABLES_SUCCESS:
			return { ...state, showError: false, errorMessage: "", tables: action.tables };
		case tableConstants.SET_TABLET_ERROR:
			return { ...state, showError: true, errorMessage: action.errorMessage, tables: [] };

		case tableConstants.TABLE_DELETE_REQUEST:
			return {
				...state,
				crudTable: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
					successMessage: "",
				},
			};
		case tableConstants.TABLE_DELETE_SUCCESS:
			let arTables = state.tables.filter((table) => table.Id !== action.tableId);
			return {
				...state,
				crudTable: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
					successMessage: action.successMessage,
				},
				tables: arTables,
			};
		case tableConstants.TABLE_DELETE_FAILURE:
			return {
				...state,
				crudTable: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
					successMessage: "",
				},
			};
		default:
			return state;
	}
};
