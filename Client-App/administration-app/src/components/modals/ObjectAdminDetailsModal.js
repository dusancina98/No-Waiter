import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { userConstants } from "../../constants/UserConstants";
import { UserContext } from "../../contexts/UserContext";
import { userService } from "../../services/UserService";
import EditObjectAdminForm from "../admin-objectadmins/EditObjectAdminForm";
import FailureAlert from "../messages/FailureAlert";
import SuccessAlert from "../messages/SuccessAlert";
import ObjectAdminDetailsModalButtons from "./ObjectAdminDetailsModalButtons";

const ObjectAdminDetailsModal = () => {
	const { userState, dispatch } = useContext(UserContext);

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_OBJECT_ADMIN_DETAILS });
	};

	const handleObjectAdminDelete = () => {
		userService.deleteObjectAdmin(userState.objectAdminDetails.objectAdmin.Id, dispatch);
	};

	return (
		<Modal show={userState.objectAdminDetails.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>
						{userState.objectAdminDetails.objectAdmin.EntityDTO.Name} {userState.objectAdminDetails.objectAdmin.EntityDTO.Surname}
					</big>
					<label className="badge badge-info align-middle ml-3">{userState.objectAdminDetails.objectAdmin.EntityDTO.ObjectName}</label>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<SuccessAlert
					hidden={!userState.editObjectAdmin.showSuccessMessage}
					header="Success"
					message={userState.editObjectAdmin.successMessage}
					handleCloseAlert={() => dispatch({ type: userConstants.OBJECT_ADMIN_UPDATE_REQUEST })}
				/>
				<FailureAlert
					hidden={!userState.editObjectAdmin.showErrorMessage}
					header="Error"
					message={userState.editObjectAdmin.errorMessage}
					handleCloseAlert={() => dispatch({ type: userConstants.OBJECT_ADMIN_UPDATE_REQUEST })}
				/>
				<FailureAlert
					hidden={!userState.deleteObjectAdmin.showErrorMessage}
					header="Error"
					message={userState.deleteObjectAdmin.errorMessage}
					handleCloseAlert={() => dispatch({ type: userConstants.OBJECT_ADMIN_DELETE_REQUEST })}
				/>
				<div className="row">
					<div className="col-md-12 grid-margin stretch-card">
						<div className="card" style={{ border: "0" }}>
							<div className="card-body">
								<EditObjectAdminForm />
								<ObjectAdminDetailsModalButtons handleDelete={handleObjectAdminDelete} />
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleModalClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ObjectAdminDetailsModal;
