import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { colorConstants } from "../../constants/ColorConstants";
import { modalConstants } from "../../constants/ModalConstants";
import { ModalContext } from "../../contexts/ModalContext";
import ObjectDetailsModalTitle from "./ObjectDetailsModalTitle";

const ObjectDetailsModal = () => {
	const { modalState, dispatch } = useContext(ModalContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_OBJECT_DETAILS });
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
								<button
									className="btn btn-success mt-2"
									hidden={modalState.objectDetails.readOnly}
									style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}
								>
									Save
								</button>
								<button className="btn btn-primary mt-2" hidden={!modalState.objectDetails.readOnly} onClick={() => dispatch({ type: modalConstants.ALLOW_INPUT_FIELDS })}>
									Edit
								</button>
								<button className="btn btn-danger ml-3 mt-2" style={{ background: colorConstants.COLOR_RED, borderColor: colorConstants.COLOR_RED }}>
									Delete
								</button>
								<button hidden={!modalState.objectDetails.object.EntityDTO.Blocked} className="btn btn-dark ml-3 mt-2">
									Unblock
								</button>
								<button hidden={modalState.objectDetails.object.EntityDTO.Blocked} className="btn btn-dark ml-3 mt-2">
									Block
								</button>
								<button hidden={modalState.objectDetails.object.EntityDTO.Active} className="btn btn-warning ml-3 mt-2">
									Deactivate
								</button>
								<button hidden={!modalState.objectDetails.object.EntityDTO.Active} className="btn btn-warning ml-3 mt-2">
									Activate
								</button>
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
