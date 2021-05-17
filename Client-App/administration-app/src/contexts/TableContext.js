import { createContext, useReducer } from "react";
import { tableReducer } from "../reducers/TableReducer";

export const TableContext = createContext();

const TableContextProvider = (props) => {
	const [tableState, dispatch] = useReducer(tableReducer, {
		crudTable: {
			showError: false,
			errorMessage: "",
			showSuccessMessage: false,
			successMessage: "",
		},
		tables: [],
		showError: false,
		errorMessage: "",
	});

	return <TableContext.Provider value={{ tableState, dispatch }}>{props.children}</TableContext.Provider>;
};
export default TableContextProvider;
