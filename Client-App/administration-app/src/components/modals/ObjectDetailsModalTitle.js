import React, { useContext } from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { ObjectContext } from "../../contexts/ObjectContext";

const ObjectDetailsModalTitle = () => {
	const { objectState } = useContext(ObjectContext);
	return (
		<React.Fragment>
			<big>{objectState.objectDetails.object.EntityDTO.Name} </big>
			<label
				hidden={!objectState.objectDetails.object.EntityDTO.Blocked}
				className="badge badge-danger align-middle"
				style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }}
			>
				Blocked
			</label>
			<label hidden={objectState.objectDetails.object.EntityDTO.Active} className="badge badge-warning align-middle ml-2">
				Deactivated
			</label>
			<label
				hidden={!objectState.objectDetails.object.EntityDTO.Active}
				className="badge badge-success align-middle ml-2"
				style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}
			>
				Active
			</label>
		</React.Fragment>
	);
};

export default ObjectDetailsModalTitle;
