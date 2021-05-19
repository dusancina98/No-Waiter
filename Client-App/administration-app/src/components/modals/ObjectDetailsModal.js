import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { objectConstants } from "../../constants/ObjectConstants";
import { ObjectContext } from "../../contexts/ObjectContext";
import { objectService } from "../../services/ObjectService";
import EditObjectForm from "../EditObjectForm";
import FailureAlert from "../FailureAlert";
import SuccessAlert from "../SuccessAlert";
import ObjectDetailsModalButtons from "./ObjectDetailsModalButtons";
import ObjectDetailsModalTitle from "./ObjectDetailsModalTitle";

const ObjectDetailsModal = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_OBJECT_DETAILS });
	};

	const handleObjectActivation = () => {
		objectService.activateObject(objectState.objectDetails.object, dispatch);
	};

	const handleObjectDeactivation = () => {
		objectService.deactivateObject(objectState.objectDetails.object, dispatch);
	};

	const handleObjectBlock = () => {
		objectService.blockObject(objectState.objectDetails.object, dispatch);
	};

	const handleObjectUnblock = () => {
		objectService.unblockObject(objectState.objectDetails.object, dispatch);
	};

	return (
		<Modal show={objectState.objectDetails.showModal} size="xl" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<ObjectDetailsModalTitle />
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<SuccessAlert
					hidden={!objectState.editObject.showSuccessMessage}
					header="Success"
					message={objectState.editObject.successMessage}
					handleCloseAlert={() => dispatch({ type: objectConstants.OBJECT_UPDATE_REQUEST })}
				/>
				<FailureAlert
					hidden={!objectState.editObject.showErrorMessage}
					header="Error"
					message={objectState.editObject.errorMessage}
					handleCloseAlert={() => dispatch({ type: objectConstants.OBJECT_UPDATE_REQUEST })}
				/>
				<div className="row">
					<div className="col-md-6 grid-margin stretch-card">
						<div className="card" style={{ border: "0" }}>
							<div className="card-body">
								<EditObjectForm />
								<ObjectDetailsModalButtons
									handleBlock={handleObjectBlock}
									handleUnblock={handleObjectUnblock}
									handleActivation={handleObjectActivation}
									handleDeactivation={handleObjectDeactivation}
								/>
							</div>
						</div>
					</div>

					<div className="col-md-6 grid-margin stretch-card">
						<div className="card">
							<div className="card-body">
								<img src={objectState.objectDetails.object.EntityDTO.ImagePath} alt="restaurant" className="img-fluid" />
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

export default ObjectDetailsModal;
