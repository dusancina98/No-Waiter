import React, { useContext } from "react";
import DelivererList from "./DelivererList";
import DelivererDetailsModal from "./modals/DelivererDetailsModal";
import { UserContext } from "../contexts/UserContext";
import { userConstants } from "../constants/UserConstants";
import SuccessAlerts from "../components/SuccessAlert";


const DelivererTable = () => {
	const { userState, dispatch } = useContext(UserContext);

	return (
		<React.Fragment>
			<div className="col-lg-12 grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Deliverers</h4>
						<SuccessAlerts
							hidden={!userState.deleteDeliverer.showSuccessMessage}
							header="Success"
							message={userState.deleteDeliverer.successMessage}
							handleCloseAlert={() => dispatch({ type: userConstants.HIDE_DELIVERER_DELETE_ALERT })}
						/>
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th>Email</th>
										<th>Name</th>
										<th>Surname</th>
										<th>Phone number</th>
										<th>Average grade</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<DelivererList/>
									<DelivererDetailsModal/>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DelivererTable;
