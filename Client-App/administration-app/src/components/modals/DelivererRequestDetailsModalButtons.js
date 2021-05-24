import React from "react";
import { colorConstants } from "../../constants/ColorConstants";

const DelivererRequestDetailsModalButtons = ({ handleApproveRequest, handleRejectRequest }) => {
	return (
		<React.Fragment>
			<button className="btn btn-primary mt-2 mr-3" onClick={handleApproveRequest}>
				Approve
			</button>
			<button className="btn btn-danger mt-2" style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }} onClick={handleRejectRequest}>
				Reject
			</button>
		</React.Fragment>
	);
};

export default DelivererRequestDetailsModalButtons;
