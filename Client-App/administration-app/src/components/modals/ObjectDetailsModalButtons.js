import React, { useContext } from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { modalConstants } from "../../constants/ModalConstants";
import { ModalContext } from "../../contexts/ModalContext";

const ObjectDetailsModalButtons = (props) => {
	const { modalState, dispatch } = useContext(ModalContext);

	return (
		<React.Fragment>
			<button className="btn btn-success mt-2" hidden={modalState.objectDetails.readOnly} style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}>
				Save
			</button>
			<button className="btn btn-primary mt-2" hidden={!modalState.objectDetails.readOnly} onClick={() => dispatch({ type: modalConstants.ALLOW_INPUT_FIELDS })}>
				Edit
			</button>
			<button className="btn btn-danger ml-3 mt-2" style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }}>
				Delete
			</button>
			<button onClick={props.handleUnblock} hidden={!modalState.objectDetails.object.EntityDTO.Blocked} className="btn btn-dark ml-3 mt-2">
				Unblock
			</button>
			<button onClick={props.handleBlock} hidden={modalState.objectDetails.object.EntityDTO.Blocked} className="btn btn-dark ml-3 mt-2">
				Block
			</button>
			<button onClick={props.handleDeactivation} hidden={!modalState.objectDetails.object.EntityDTO.Active} className="btn btn-warning ml-3 mt-2">
				Deactivate
			</button>
			<button onClick={props.handleActivation} hidden={modalState.objectDetails.object.EntityDTO.Active} className="btn btn-warning ml-3 mt-2">
				Activate
			</button>
		</React.Fragment>
	);
};

export default ObjectDetailsModalButtons;
