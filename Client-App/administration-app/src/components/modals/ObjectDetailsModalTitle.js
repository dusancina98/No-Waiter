import React, { useContext } from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { ModalContext } from "../../contexts/ModalContext";

const ObjectDetailsModalTitle = () => {
	const { modalState } = useContext(ModalContext);
	return (
		<React.Fragment>
			<big>{modalState.objectDetails.object.EntityDTO.Name} </big>
			<label
				hidden={!modalState.objectDetails.object.EntityDTO.Blocked}
				className="badge badge-danger align-middle"
				style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }}
			>
				Blocked
			</label>
			<label hidden={modalState.objectDetails.object.EntityDTO.Active} className="badge badge-warning align-middle ml-2">
				Deactivated
			</label>
			<label
				hidden={!modalState.objectDetails.object.EntityDTO.Active}
				className="badge badge-success align-middle ml-2"
				style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}
			>
				Active
			</label>
		</React.Fragment>
	);
};

export default ObjectDetailsModalTitle;
