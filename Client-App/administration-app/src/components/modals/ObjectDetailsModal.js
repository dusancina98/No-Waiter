import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { ModalContext } from "../../contexts/ModalContext";
import { ObjectContext } from "../../contexts/ObjectContext";
import { objectService } from "../../services/ObjectService";
import ObjectDetailsModalButtons from "./ObjectDetailsModalButtons";
import ObjectDetailsModalTitle from "./ObjectDetailsModalTitle";

const ObjectDetailsModal = () => {
	const { modalState, dispatch } = useContext(ModalContext);

	const { objectState, dispatch: objectDispatch } = useContext(ObjectContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_OBJECT_DETAILS });
	};

	const handleObjectActivation = () => {
		console.log("LALLAL");
		objectService.activateObject(modalState.objectDetails.object.Id, objectDispatch);
	};

	const handleObjectDeactivation = () => {
		objectService.deactivateObject(modalState.objectDetails.object.Id, objectDispatch);
	};

	const handleObjectBlock = () => {
		objectService.blockObject(modalState.objectDetails.object.Id, objectDispatch);
	};

	const handleObjectUnblock = () => {
		objectService.unblockObject(modalState.objectDetails.object.Id, objectDispatch);
	};

	useEffect(() => {
		setEmail(modalState.objectDetails.object.EntityDTO.Email);
		setName(modalState.objectDetails.object.EntityDTO.Name);
		setAddress(modalState.objectDetails.object.EntityDTO.Address);
		setPhoneNumber(modalState.objectDetails.object.EntityDTO.PhoneNumber);
	}, [modalState.objectDetails.object]);

	return (
		<Modal show={modalState.objectDetails.showModal} size="xl" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<ObjectDetailsModalTitle />
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<div className="col-md-6 grid-margin stretch-card">
						<div className="card" style={{ border: "0" }}>
							<div className="card-body">
								<form className="forms-sample" method="post">
									<div className="form-group">
										<label for="restaurantName">Restaurant name</label>
										<input
											readOnly={modalState.objectDetails.readOnly}
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
											readOnly={modalState.objectDetails.readOnly}
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
											readOnly={modalState.objectDetails.readOnly}
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
											readOnly={modalState.objectDetails.readOnly}
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
