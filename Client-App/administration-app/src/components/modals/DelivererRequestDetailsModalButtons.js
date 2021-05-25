import React,{ useContext }  from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { UserContext } from "../../contexts/UserContext";

const DelivererRequestDetailsModalButtons = ({ handleApproveRequest, handleRejectRequest, handleConfirmReject }) => {
	const { userState } = useContext(UserContext);


	return (
		<React.Fragment>
			<button hidden={userState.delivererRequestDetails.showRejectWindow} className="btn btn-primary mt-2 mr-3" onClick={handleApproveRequest}>
				Approve
			</button>
			<button hidden={userState.delivererRequestDetails.showRejectWindow} className="btn btn-danger mt-2" style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }} onClick={handleRejectRequest}>
				Reject
			</button>
			<button hidden={!userState.delivererRequestDetails.showRejectWindow} className="btn btn-danger mt-2" style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }} onClick={handleConfirmReject}>
				Confirm reject
			</button>
		</React.Fragment>
	);
};

export default DelivererRequestDetailsModalButtons;
