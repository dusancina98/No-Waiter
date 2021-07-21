import React, { useContext, useEffect } from "react";
import { orderConstants } from "../../constants/OrderConstants";
import { OrderContext } from "../../contexts/OrderContext";
import { TableContext } from "../../contexts/TableContext";
import { tableService } from "../../services/TableService";
import CreateOrderTableItem from "./CreateOrderTableItem";

const CreateOrderTableListSelect = () => {
	const { tableState, dispatch } = useContext(TableContext);
	const orderCtx = useContext(OrderContext);

	const handleTableSelect = (tableId, tableNumber) => {
		orderCtx.dispatch({ type: orderConstants.CREATE_ORDER_SELECT_TABLE, table: { id: tableId, number: tableNumber } });
	};

	useEffect(() => {
		const getObjectsHandler = async () => {
			await tableService.findAll(dispatch);
		};
		getObjectsHandler();
	}, [orderCtx.orderState.loadTables, dispatch]);

	return (
		<React.Fragment>
			<div className="col-md-8 col-lg-8 col-12 no-gutters" hidden={orderCtx.orderState.createOrder.pageVisible !== 3}>
				<div className="row">
					{tableState.tables.map((table) => {
						return <CreateOrderTableItem key={table.Id} number={table.EntityDTO.Number} handleTableSelect={() => handleTableSelect(table.Id, table.EntityDTO.Number)} />;
					})}
				</div>
			</div>
		</React.Fragment>
	);
};

export default CreateOrderTableListSelect;
