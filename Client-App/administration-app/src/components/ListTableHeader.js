import React, { useContext } from "react";
import { TableContext } from "../contexts/TableContext";
import { tableService } from "../services/TableService";

const ListTableHeader = () => {
	const { dispatch } = useContext(TableContext);

	const handleCreateTable = () => {
		tableService.createTable(dispatch);
	};

	return (
		<div className="row">
			<div className="col-md-12  stretch-card">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Tables</h4>
						<button type="button" className="btn btn-primary btn-icon-text" onClick={handleCreateTable}>
							<i class="mdi mdi-plus"></i>
							Add new table
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListTableHeader;
