import { tableConstants } from "../constants/TableConstants";

export const tableReducer = (state, action) => {
	switch (action.type) {
		case tableConstants.TABLE_CREATE_REQUEST:
			return {
				...state,
				createTable: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
				},
			};
		case tableConstants.TABLE_CREATE_SUCCESS:
			let arrTables = [...state.tables];
			arrTables.push(action.table);
			return {
				...state,
				createTable: {
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
				},
				tables: arrTables,
			};
		case tableConstants.TABLE_CREATE_FAILURE:
			return {
				...state,
				createTable: {
					showError: true,
					errorMessage: action.errorMessage,
					showSuccessMessage: false,
				},
			};
		case tableConstants.SET_TABLES_REQUEST:
			return { ...state, tables: [], showError: false, errorMessage: "" };
		case tableConstants.SET_TABLES_SUCCESS:
			return { ...state, showError: false, errorMessage: "", tables: action.tables };
		case tableConstants.SET_TABLET_ERROR:
			return { ...state, showError: true, errorMessage: action.errorMessage, tables: [] };
		default:
			return state;
	}
};
