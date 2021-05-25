import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { UserContext } from "../../contexts/UserContext";
import DelivererRequestDetailsModalButtons from "./DelivererRequestDetailsModalButtons";
import { userService } from "../../services/UserService";
import { userConstants } from "../../constants/UserConstants";
import FailureAlert from "../FailureAlert";

const DelivererRequestDetailsModal = () => {
	const { userState, dispatch } = useContext(UserContext);

    const [reason, setReason] = useState("");

    const handleApproveRequest =() =>{
        let requestIdDTO = {
            id : userState.delivererRequestDetails.requestDetails.Id
        }

        userService.approveDelivererRequest(requestIdDTO,dispatch);
    }

    const handleConfirmReject = () => {
        let rejectRequestDTO = {
            'Id': userState.delivererRequestDetails.requestDetails.Id,
            'Reason': reason
        }

        userService.rejectDelivererRequest(rejectRequestDTO,dispatch);
    }

    const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_DELIVERER_REQUEST_DETAILS });
	}

    const handleRejectRequest = () => {
		dispatch({ type: modalConstants.SHOW_DELIVERER_REQUEST_REJECT_WINDOW });
    }

    const handleBack = () => {
        dispatch({ type: modalConstants.BACK_FROM_DELIVERER_REQUEST_REJECT_WINDOW });
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
                <div hidden={userState.delivererRequestDetails.showRejectWindow}>
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
                                    <DelivererRequestDetailsModalButtons handleApproveRequest={handleApproveRequest} handleRejectRequest={handleRejectRequest} handleConfirmReject={handleConfirmReject}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div hidden={!userState.delivererRequestDetails.showRejectWindow}>
                    <button  onClick = {handleBack} className="btn btn-link btn-xl" type="button">
                        <i className="icofont-rounded-left mr-1"></i>
                        Back
                    </button> 
                    <FailureAlert
					    hidden={!userState.rejectDeliveryRequest.showErrorMessage}
					    header="Error"
					    message={userState.rejectDeliveryRequest.errorMessage}
					    handleCloseAlert={() => dispatch({ type: userConstants.HIDE_FAILURE_ALERT_REJECT_DELIVERY_REQUEST })}
				    />
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card" style={{ border: "0" }}>
                                <div className="card-body">
                                
                                    <div className="form-group">
                                        <label for="name">Reason</label>
                                        <input
                                            type="textarea" 
                                            required
                                            height='500px'
                                            value={reason}
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder="Reason"
                                            onChange={(e) => setReason(e.target.value)}
                                            
                                        />
                                    </div>
                                    <DelivererRequestDetailsModalButtons handleApproveRequest={handleApproveRequest} handleRejectRequest={handleRejectRequest} handleConfirmReject={handleConfirmReject}/>
                                </div>
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
