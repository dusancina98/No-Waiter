import React, { useContext, useState } from "react";
import { userConstants } from "../constants/UserConstants";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import FailureAlert from "./FailureAlert";
import SuccessAlert from "./SuccessAlert";

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
			<SuccessAlert
				hidden={!userState.createWaiter.showSuccessMessage}
				header="Success"
				message="You successfully added new waiter"
				handleCloseAlert={() => dispatch({ type: userConstants.WAITER_CREATE_REQUEST })}
			/>
			<FailureAlert
				hidden={!userState.createWaiter.showError}
				header="Error"
				message={userState.createWaiter.errorMessage}
				handleCloseAlert={() => dispatch({ type: userConstants.WAITER_CREATE_REQUEST })}
			/>
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
		</React.Fragment>
	);
};

export default CreateWaiterForm;
