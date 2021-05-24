import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { UserContext } from "../../contexts/UserContext";
import DelivererRequestDetailsModalButtons from "./DelivererRequestDetailsModalButtons";
import { userService } from "../../services/UserService";

const DelivererRequestDetailsModal = () => {
	const { userState, dispatch } = useContext(UserContext);

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_DELIVERER_REQUEST_DETAILS });
	};

    const handleRejectRequest = () => {
        alert('TODO')
    }

    const handleApproveRequest =() =>{

        let requestIdDTO = {
            id : userState.delivererRequestDetails.requestDetails.Id
        }

        userService.approveDelivererRequest(requestIdDTO,dispatch);
    }

	return (
		<Modal show={userState.delivererRequestDetails.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
                    <big>
						Prijava od: {userState.delivererRequestDetails.requestDetails.EntityDTO.Name} {userState.delivererRequestDetails.requestDetails.EntityDTO.Surname}
				    </big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<div className="col-md-12 grid-margin stretch-card">
						<div className="card" style={{ border: "0" }}>
							<div className="card-body">
                                <div className="form-group">
                                    <label for="name">Email</label>
                                    <input
                                        type="text"
                                        readOnly='true'
                                        value={userState.delivererRequestDetails.requestDetails.EntityDTO.Email}
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="name">Name</label>
                                    <input
                                        type="text"
                                        readOnly='true'
                                        value={userState.delivererRequestDetails.requestDetails.EntityDTO.Name}
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="name">Surname</label>
                                    <input
                                        type="text"
                                        readOnly='true'
                                        value={userState.delivererRequestDetails.requestDetails.EntityDTO.Surname}
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="name">Phone Number</label>
                                    <input
                                        type="text"
                                        readOnly='true'
                                        value={userState.delivererRequestDetails.requestDetails.EntityDTO.PhoneNumber}
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="name">Reference</label>
                                    <input
                                        type="text"
                                        readOnly='true'
                                        value={userState.delivererRequestDetails.requestDetails.EntityDTO.Reference}
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                    />
                                </div>
                                <DelivererRequestDetailsModalButtons handleApproveRequest={handleApproveRequest} handleRejectRequest={handleRejectRequest}/>
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

export default DelivererRequestDetailsModal;
