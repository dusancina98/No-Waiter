import React, { useContext, useEffect } from "react";
import { TableContext } from "../contexts/TableContext";
import { tableService } from "../services/TableService";
import TableItem from "./TableItem";

const TableList = () => {
	const { tableState, dispatch } = useContext(TableContext);

	useEffect(() => {
		const getObjectsHandler = async () => {
			await tableService.findAll(dispatch);
		};
		getObjectsHandler();
	}, [dispatch]);

	const handleTableDelete = (table) => {
		//dispatch({ type: modalConstants.SHOW_OBJECT_DETAILS, object });
	};

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="row">
					{tableState.tables.map((table) => {
						return <TableItem key={table.Id} number={table.EntityDTO.Number} deleteHandler={() => handleTableDelete(table)} />;
					})}
				</div>
			</div>
		</React.Fragment>
	);
};

export default TableList;
