import React, { useContext } from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { modalConstants } from "../../constants/ModalConstants";
import { UserContext } from "../../contexts/UserContext";

const WaiterDetailsModalButtons = ({handleDeleteWaiter}) => {
	const { userState, dispatch } = useContext(UserContext);

	return (
		<React.Fragment>
			<button className="btn btn-primary mt-2 mr-3" hidden={!userState.waiterDetails.readOnly} onClick={() => dispatch({ type: modalConstants.ALLOW_WAITER_DETAILS_INPUT_FIELDS })}>
				Edit
			</button>
			<button onClick={() => handleDeleteWaiter(userState.waiterDetails.waiter.Id)} className="btn btn-danger mt-2" style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }}>
				Delete
			</button>
		</React.Fragment>
	);
};

export default WaiterDetailsModalButtons;
