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

	const handleTableDelete = (tableId) => {
		tableService.deleteTable(tableId, dispatch);
	};

	return (
		<React.Fragment>
			<div className="row mt-3">
				{tableState.tables.map((table) => {
					return <TableItem key={table.Id} number={table.EntityDTO.Number} deleteHandler={() => handleTableDelete(table.Id)} />;
				})}
			</div>
		</React.Fragment>
	);
};

export default TableList;
