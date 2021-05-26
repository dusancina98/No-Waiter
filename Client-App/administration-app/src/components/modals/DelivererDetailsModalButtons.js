import React,{ useContext }  from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { UserContext } from "../../contexts/UserContext";

const DelivererDetailsModalButtons = ({ handleActivateDeliverer, handleDeactivateDeliverer, handleDeleteDeliverer }) => {
	const { userState } = useContext(UserContext);

	return (
		<React.Fragment>
			<button hidden={userState.delivererDetails.deliverer.EntityDTO.DelivererStatus==='ACTIVE'} className="btn btn-primary mt-2 mr-3" onClick={handleActivateDeliverer}>
				Activate
			</button>
			<button hidden={userState.delivererDetails.deliverer.EntityDTO.DelivererStatus!=='ACTIVE'} className="btn btn-warning mt-2 mr-3" onClick={handleDeactivateDeliverer}>
				Deactivate
			</button>
			<button className="btn btn-danger mt-2"  style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }} onClick={handleDeleteDeliverer}>
				Delete
			</button>
		</React.Fragment>
	);
};

export default DelivererDetailsModalButtons;
