import React, { useContext, useState } from "react";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";

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
	};

	return (
		<React.Fragment>
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
			<div hidden={!objectState.createObject.showSuccessMessage} className="form-group text-center" style={{ fontSize: "1.3rem" }}>
				You successfully created new object
			</div>
			<div hidden={!objectState.createObject.showError} className="form-group text-center text-danger" style={{ fontSize: "1.1rem" }}>
				{objectState.createObject.errorMessage}
			</div>
		</React.Fragment>
	);
};

export default CreateObjectForm;
