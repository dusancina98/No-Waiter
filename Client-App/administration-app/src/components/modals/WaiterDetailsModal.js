import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { userConstants } from "../../constants/UserConstants";
import { UserContext } from "../../contexts/UserContext";
import { userService } from "../../services/UserService";
import EditWaiterForm from "../objectadmin-employees/EditWaiterForm";
import FailureAlert from "../messages/FailureAlert";
import SuccessAlert from "../messages/SuccessAlert";
import WaiterDetailsModalButtons from "./WaiterDetailsModalButtons";

const WaiterDetailsModal = () => {
	const { userState, dispatch } = useContext(UserContext);

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_WAITER_DETAILS });
	};

	const handleDeleteWaiter = (id) => {
		userService.deleteWaiter(id ,dispatch);
	}

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
				<SuccessAlert
					hidden={!userState.editWaiter.showSuccessMessage}
					header="Success"
					message={userState.editWaiter.successMessage}
					handleCloseAlert={() => dispatch({ type: userConstants.WAITER_UPDATE_REQUEST })}
				/>
				<FailureAlert
					hidden={!userState.editWaiter.showErrorMessage}
					header="Error"
					message={userState.editWaiter.errorMessage}
					handleCloseAlert={() => dispatch({ type: userConstants.WAITER_UPDATE_REQUEST })}
				/>
				<div className="row">
					<div className="col-md-12 grid-margin stretch-card">
						<div className="card" style={{ border: "0" }}>
							<div className="card-body">
								<EditWaiterForm />
								<WaiterDetailsModalButtons handleDeleteWaiter={handleDeleteWaiter}/>
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
