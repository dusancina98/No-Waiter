import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { UserContext } from "../../contexts/UserContext";
import { userService } from "../../services/UserService";
import { userConstants } from "../../constants/UserConstants";
import FailureAlert from "../messages/FailureAlert";
import SuccessAlert from "../messages/SuccessAlert";
import DelivererDetailsModalButtons from "./DelivererDetailsModalButtons";

const DelivererDetailsModal = () => {
	const { userState, dispatch } = useContext(UserContext);

    const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_DELIVERER_DETAILS });
	}

    const handleDeleteDeliverer = () =>{
        userService.deleteDeliverer(userState.delivererDetails.deliverer, dispatch);
    }

    const handleActivateDeliverer = () =>{
        userService.activateDeliverer(userState.delivererDetails.deliverer, dispatch);
    }

    const handleDeactivateDeliverer = () =>{
        userService.deactivateDeliverer(userState.delivererDetails.deliverer, dispatch);
    }

	return (
		<Modal show={userState.delivererDetails.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
                    <big>
						Dostavljac: {userState.delivererDetails.deliverer.EntityDTO.Name} {userState.delivererDetails.deliverer.EntityDTO.Surname}    <label  className={userState.delivererDetails.deliverer.EntityDTO.DelivererStatus==='ACTIVE' ? 'badge badge-info' : 'badge badge-info-inactive'}>{userState.delivererDetails.deliverer.EntityDTO.DelivererStatus}</label>
				    </big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
                    <SuccessAlert
                        hidden={!userState.editDeliverer.showSuccessMessage}
                        header="Success"
                        message={userState.editDeliverer.successMessage}
                        handleCloseAlert={() => dispatch({ type: userConstants.HIDE_UPDATE_DELIVERER_ALERTS })}
                    />
                    <FailureAlert
                        hidden={!userState.editDeliverer.showErrorMessage}
                        header="Error"
                        message={userState.editDeliverer.errorMessage}
                        handleCloseAlert={() => dispatch({ type: userConstants.HIDE_UPDATE_DELIVERER_ALERTS })}
                    />
                    <FailureAlert
                        hidden={!userState.deleteDeliverer.showErrorMessage}
                        header="Error"
                        message={userState.deleteDeliverer.errorMessage}
                        handleCloseAlert={() => dispatch({ type: userConstants.HIDE_DELIVERER_DELETE_ALERT })}
                    />
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card" style={{ border: "0" }}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label for="name">Email</label>
                                        <input
                                            type="text"
                                            readOnly='true'
                                            value={userState.delivererDetails.deliverer.EntityDTO.Email}
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
                                            value={userState.delivererDetails.deliverer.EntityDTO.Name}
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
                                            value={userState.delivererDetails.deliverer.EntityDTO.Surname}
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
                                            value={userState.delivererDetails.deliverer.EntityDTO.PhoneNumber}
                                            className="form-control"
                                            id="name"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <DelivererDetailsModalButtons handleActivateDeliverer={handleActivateDeliverer} handleDeactivateDeliverer={handleDeactivateDeliverer} handleDeleteDeliverer={handleDeleteDeliverer}/>
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

export default DelivererDetailsModal;
