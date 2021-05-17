import { useContext, useEffect, useState } from "react";
import { colorConstants } from "../constants/ColorConstants";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

const EditWaiterForm = () => {
	const { userState, dispatch } = useContext(UserContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [surname, setSurname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		setEmail(userState.waiterDetails.waiter.EntityDTO.Email);
		setName(userState.waiterDetails.waiter.EntityDTO.Name);
		setSurname(userState.waiterDetails.waiter.EntityDTO.Surname);
		setAddress(userState.waiterDetails.waiter.EntityDTO.Address);
		setPhoneNumber(userState.waiterDetails.waiter.EntityDTO.PhoneNumber);
	}, [userState.waiterDetails.waiter]);

	const handleSubmit = (e) => {
		// e.preventDefault();
		// let objectAdmin = {
		// 	Id: userState.objectAdminDetails.objectAdmin.Id,
		// 	EntityDTO: { Email: email, Name: name, ObjectId: objectId, ObjectName: objectName, Surname: surname, Address: address, PhoneNumber: phoneNumber },
		// };
		//userService.updateObjectAdmin(objectAdmin, dispatch);
	};

	return (
		<form className="forms-sample" method="put" onSubmit={handleSubmit}>
			<div className="form-group">
				<label for="emailAddress">Email address</label>
				<input type="email" required readOnly value={email} className="form-control" id="emailAddress" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
			</div>
			<div className="form-group">
				<label for="name">Name</label>
				<input type="text" readOnly={userState.waiterDetails.readOnly} required value={name} className="form-control" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
			</div>

			<div className="form-group">
				<label for="surname">Surname</label>
				<input
					type="text"
					readOnly={userState.waiterDetails.readOnly}
					required
					value={surname}
					className="form-control"
					id="surname"
					placeholder="Surname"
					onChange={(e) => setSurname(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label for="address">Address</label>
				<input
					type="text"
					readOnly={userState.waiterDetails.readOnly}
					required
					value={address}
					className="form-control"
					id="address"
					placeholder="Address"
					onChange={(e) => setAddress(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label for="phoneNumber">Phone number</label>
				<input
					type="text"
					required
					readOnly={userState.waiterDetails.readOnly}
					value={phoneNumber}
					className="form-control"
					id="phoneNumber"
					placeholder="Phone number"
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
			</div>

			<button
				type="submit"
				className="btn btn-success mt-2"
				hidden={userState.waiterDetails.readOnly}
				style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}
			>
				Save
			</button>
		</form>
	);
};

export default EditWaiterForm;
