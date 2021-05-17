import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { UserContext } from "../../contexts/UserContext";
import EditWaiterForm from "../EditWaiterForm";
import WaiterDetailsModalButtons from "./WaiterDetailsModalButtons";

const WaiterDetailsModal = () => {
	const { userState, dispatch } = useContext(UserContext);

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_WAITER_DETAILS });
	};

	return (
		<Modal show={userState.waiterDetails.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>
						{userState.waiterDetails.waiter.EntityDTO.Name} {userState.waiterDetails.waiter.EntityDTO.Surname}
					</big>
					<label className="badge badge-info align-middle ml-3">{userState.waiterDetails.waiter.EntityDTO.ObjectName}</label>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* <SuccessAlert
					hidden={!userState.editObjectAdmin.showSuccessMessage}
					header="Success"
					message={userState.editObjectAdmin.successMessage}
					handleCloseAlert={() => dispatch({ type: userConstants.HIDE_OBJECT_ADMIN_EDIT_SUCCESS })}
				/>
				<FailureAlert
					hidden={!userState.editObjectAdmin.showErrorMessage}
					header="Error"
					message={userState.editObjectAdmin.successMessage}
					handleCloseAlert={() => dispatch({ type: userConstants.HIDE_OBJECT_ADMIN_EDIT_FAILURE })}
				/> */}
				<div className="row">
					<div className="col-md-12 grid-margin stretch-card">
						<div className="card" style={{ border: "0" }}>
							<div className="card-body">
								<EditWaiterForm />
								<WaiterDetailsModalButtons />
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

export default WaiterDetailsModal;
