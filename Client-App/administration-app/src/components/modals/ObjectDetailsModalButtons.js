import React, { useContext } from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { modalConstants } from "../../constants/ModalConstants";
import { ObjectContext } from "../../contexts/ObjectContext";
import { hasRoles } from "../../helpers/auth-header";

const ObjectDetailsModalButtons = (props) => {
	const { objectState, dispatch } = useContext(ObjectContext);

	return (
		<React.Fragment>
			<button  className="btn btn-primary mt-2 mr-3" hidden={!objectState.objectDetails.readOnly || hasRoles("ROLE_OBJADMIN")} onClick={() => dispatch({ type: modalConstants.ALLOW_OBJECT_DETAILS_INPUT_FIELDS })}>
				Edit
			</button>
			<button  className="btn btn-primary mt-2 mr-3" hidden={!objectState.objectDetails.readOnly || hasRoles("ROLE_SYSADMIN")} onClick={() => dispatch({ type: modalConstants.ALLOW_OBJECT_DETAILS_INPUT_FIELDS })}>
				Edit information
			</button>
			<button hidden={!hasRoles("ROLE_SYSADMIN")} onClick={props.handleDelete} className="btn btn-danger mt-2" style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }}>
				Delete
			</button>
			<button  onClick={props.handleUnblock} hidden={!objectState.objectDetails.object.EntityDTO.Blocked || !hasRoles("ROLE_SYSADMIN")} className="btn btn-dark ml-3 mt-2">
				Unblock
			</button>
			<button onClick={props.handleBlock} hidden={objectState.objectDetails.object.EntityDTO.Blocked || !hasRoles("ROLE_SYSADMIN")} className="btn btn-dark ml-3 mt-2">
				Block
			</button>
			<button onClick={props.handleDeactivation} hidden={!objectState.objectDetails.object.EntityDTO.Active || !hasRoles("ROLE_SYSADMIN")} className="btn btn-warning ml-3 mt-2">
				Deactivate
			</button>
			<button onClick={objectState.objectDetails.object.EntityDTO.Blocked? '': props.handleActivation} hidden={objectState.objectDetails.object.EntityDTO.Active || !hasRoles("ROLE_SYSADMIN")} className= {objectState.objectDetails.object.EntityDTO.Blocked? "btn btn-warning ml-3 mt-2 disabled":"btn btn-warning ml-3 mt-2"} >
				Activate
			</button>
		</React.Fragment>
	);
};

export default ObjectDetailsModalButtons;
