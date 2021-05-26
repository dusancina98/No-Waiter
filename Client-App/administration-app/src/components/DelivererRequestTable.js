import React, { useContext } from "react";
import DelivererRequestList from "./DelivererRequestList";
import DelivererRequestDetailsModal from "./modals/DelivererRequestDetailsModal";
import { UserContext } from "../contexts/UserContext";
import { userConstants } from "../constants/UserConstants";
import SuccessAlerts from "../components/SuccessAlert";
import FailureAlert from "../components/FailureAlert";

const DelivererRequestTable = () => {
	const { userState, dispatch } = useContext(UserContext);

	return (
		<React.Fragment>
			<div className="col-lg-12 grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Deliverer requests</h4>
						<SuccessAlerts
							hidden={!userState.approveDeliveryRequest.showSuccessMessage}
							header="Success"
							message={userState.approveDeliveryRequest.successMessage}
							handleCloseAlert={() => dispatch({ type: userConstants.HIDE_DELIVERER_REQUEST_ALERTS })}
						/>

						<SuccessAlerts
							hidden={!userState.rejectDeliveryRequest.showSuccessMessage}
							header="Success"
							message={userState.rejectDeliveryRequest.successMessage}
							handleCloseAlert={() => dispatch({ type: userConstants.HIDE_DELIVERER_REQUEST_ALERTS })}
						/>	

						<FailureAlert
					    	hidden={!userState.approveDeliveryRequest.showErrorMessage}
					    	header="Error"
					    	message={userState.approveDeliveryRequest.errorMessage}
					    	handleCloseAlert={() => dispatch({ type: userConstants.HIDE_DELIVERER_REQUEST_ALERTS })}
				    	/>
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th>Email</th>
										<th>Name</th>
										<th>Surname</th>
										<th>Phone number</th>
									</tr>
								</thead>
								<tbody>
									<DelivererRequestList/>
									<DelivererRequestDetailsModal/>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DelivererRequestTable;
