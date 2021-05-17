import React, { useContext } from "react";
import { tableConstants } from "../constants/TableConstants";
import { TableContext } from "../contexts/TableContext";
import { tableService } from "../services/TableService";
import FailureAlert from "./FailureAlert";
import SuccessAlert from "./SuccessAlert";

const ListTableHeader = () => {
	const { tableState, dispatch } = useContext(TableContext);

	const handleCreateTable = () => {
		tableService.createTable(dispatch);
	};

	return (
		<React.Fragment>
			<SuccessAlert
				hidden={!tableState.crudTable.showSuccessMessage}
				header="Success"
				message={tableState.crudTable.successMessage}
				handleCloseAlert={() => dispatch({ type: tableConstants.TABLE_CREATE_REQUEST })}
			/>
			<FailureAlert
				hidden={!tableState.crudTable.showError}
				header="Error"
				message={tableState.crudTable.errorMessage}
				handleCloseAlert={() => dispatch({ type: tableConstants.TABLE_CREATE_REQUEST })}
			/>
			<div className="row">
				<div className="col-md-12 stretch-card">
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
		</React.Fragment>
	);
};

export default ListTableHeader;
