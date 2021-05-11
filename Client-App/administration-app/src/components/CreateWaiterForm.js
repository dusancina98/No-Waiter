import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

const CreateWaiterForm = () => {
	const { userState, dispatch } = useContext(UserContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [surname, setSurname] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		let waiter = { Email: email, Name: name, Surname: surname, Address: address, PhoneNumber: phoneNumber };
		userService.createWaiter(waiter, dispatch);
	};

	return (
		<React.Fragment>
			<form className="forms-sample" method="post" onSubmit={handleSubmit}>
				<div className="form-group">
					<label for="emailAddress">Email address</label>
					<input type="email" required className="form-control" id="emailAddress" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="form-group">
					<label for="name">Name</label>
					<input type="text" required className="form-control" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
				</div>

				<div className="form-group">
					<label for="surname">Surname</label>
					<input type="text" required className="form-control" id="surname" placeholder="Surname" onChange={(e) => setSurname(e.target.value)} />
				</div>
				<div className="form-group">
					<label for="address">Address</label>
					<input type="text" required className="form-control" id="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
				</div>
				<div className="form-group">
					<label for="phoneNumber">Phone number</label>
					<input type="text" required className="form-control" id="phoneNumber" placeholder="Phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
				</div>
				<button type="submit" className="btn btn-primary mr-2">
					Submit
				</button>
			</form>
			<div hidden={!userState.createWaiter.showSuccessMessage} className="form-group text-center" style={{ fontSize: "1.3rem" }}>
				You successfully added new waiter
			</div>
			<div hidden={!userState.createWaiter.showError} className="form-group text-center text-danger" style={{ fontSize: "1.1rem" }}>
				{userState.createWaiter.errorMessage}
			</div>
		</React.Fragment>
	);
};

export default CreateWaiterForm;
