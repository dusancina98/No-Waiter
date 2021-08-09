import React, { useContext, useState } from "react";
import { objectConstants } from "../constants/ObjectConstants";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import FailureAlert from "./FailureAlert";
import SuccessAlert from "./SuccessAlert";

const CreateObjectForm = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		let object = { Name: name, Email: email, PhoneNumber: phoneNumber, ImagePath: "assets/images/restaurant.jpg", Address: address };
		objectService.createObject(object, dispatch);

		setName("");
		setEmail("");
		setPhoneNumber("");
		setAddress("");
	};


	return (
		<React.Fragment>
			<SuccessAlert
				hidden={!objectState.createObject.showSuccessMessage}
				header="Success"
				message="You successfully created new object"
				handleCloseAlert={() => dispatch({ type: objectConstants.OBJECT_CREATE_REQUEST })}
			/>
			<FailureAlert
				hidden={!objectState.createObject.showError}
				header="Error"
				message={objectState.createObject.errorMessage}
				handleCloseAlert={() => dispatch({ type: objectConstants.OBJECT_CREATE_REQUEST })}
			/>
			<form className="forms-sample" method="post" onSubmit={handleSubmit}>
				<div className="form-group">
					<label for="restaurantName">Restaurant name</label>
					<input type="text" required className="form-control" id="restaurantName" placeholder="Restaurant name" onChange={(e) => setName(e.target.value)} />
				</div>
				<div className="form-group">
					<label for="emailAddress">Email address</label>
					<input type="email" required className="form-control" id="emailAddress" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="form-group">
					<label for="phoneNumber">Phone number</label>
					<input type="text" required className="form-control" id="phoneNumber" placeholder="Phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
				</div>
				<div className="form-group">
					<label for="address">Address</label>
					<input type="text" required className="form-control" id="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
				</div>
				<button type="submit" className="btn btn-primary mr-2">
					Submit
				</button>
			</form>
		</React.Fragment>
	);
};

export default CreateObjectForm;
