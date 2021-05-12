import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { objectConstants } from "../../constants/ObjectConstants";
import { ObjectContext } from "../../contexts/ObjectContext";
import { objectService } from "../../services/ObjectService";
import FailureAlert from "../FailureAlert";
import SuccessAlert from "../SuccessAlert";
import ObjectDetailsModalButtons from "./ObjectDetailsModalButtons";
import ObjectDetailsModalTitle from "./ObjectDetailsModalTitle";

const ObjectDetailsModal = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

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

	useEffect(() => {
		setEmail(objectState.objectDetails.object.EntityDTO.Email);
		setName(objectState.objectDetails.object.EntityDTO.Name);
		setAddress(objectState.objectDetails.object.EntityDTO.Address);
		setPhoneNumber(objectState.objectDetails.object.EntityDTO.PhoneNumber);
	}, [objectState.objectDetails.object]);

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
					handleCloseAlert={() => dispatch({ type: objectConstants.HIDE_OBJECT_EDIT_SUCCESS })}
				/>
				<FailureAlert
					hidden={!objectState.editObject.showErrorMessage}
					header="Failure"
					message={objectState.editObject.successMessage}
					handleCloseAlert={() => dispatch({ type: objectConstants.HIDE_OBJECT_EDIT_FAILURE })}
				/>
				<div className="row">
					<div className="col-md-6 grid-margin stretch-card">
						<div className="card" style={{ border: "0" }}>
							<div className="card-body">
								<form className="forms-sample" method="post">
									<div className="form-group">
										<label for="restaurantName">Restaurant name</label>
										<input
											readOnly={objectState.objectDetails.readOnly}
											type="text"
											required
											className="form-control"
											id="restaurantName"
											value={name}
											placeholder="Restaurant name"
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									<div className="form-group">
										<label for="emailAddress">Email address</label>
										<input
											readOnly={objectState.objectDetails.readOnly}
											type="email"
											required
											className="form-control"
											id="emailAddress"
											value={email}
											placeholder="Email"
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className="form-group">
										<label for="phoneNumber">Phone number</label>
										<input
											readOnly={objectState.objectDetails.readOnly}
											type="text"
											required
											className="form-control"
											id="phoneNumber"
											value={phoneNumber}
											placeholder="Phone number"
											onChange={(e) => setPhoneNumber(e.target.value)}
										/>
									</div>
									<div className="form-group">
										<label for="address">Address</label>
										<input
											readOnly={objectState.objectDetails.readOnly}
											type="text"
											required
											className="form-control"
											id="address"
											value={address}
											placeholder="Address"
											onChange={(e) => setAddress(e.target.value)}
										/>
									</div>
								</form>
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
								<img src="assets/images/restaurant.jpg" alt="restaurant" className="img-fluid" />
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
