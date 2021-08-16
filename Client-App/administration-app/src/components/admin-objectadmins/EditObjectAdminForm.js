import { useContext, useEffect, useState } from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { UserContext } from "../../contexts/UserContext";
import { userService } from "../../services/UserService";

const EditObjectAdminForm = () => {
	const { userState, dispatch } = useContext(UserContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [surname, setSurname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [objectName, setObjectName] = useState("");
	const [objectId, setObjectId] = useState("");

	useEffect(() => {
		setEmail(userState.objectAdminDetails.objectAdmin.EntityDTO.Email);
		setName(userState.objectAdminDetails.objectAdmin.EntityDTO.Name);
		setSurname(userState.objectAdminDetails.objectAdmin.EntityDTO.Surname);
		setAddress(userState.objectAdminDetails.objectAdmin.EntityDTO.Address);
		setPhoneNumber(userState.objectAdminDetails.objectAdmin.EntityDTO.PhoneNumber);
		setObjectId(userState.objectAdminDetails.objectAdmin.EntityDTO.ObjectId);
		setObjectName(userState.objectAdminDetails.objectAdmin.EntityDTO.ObjectName);
	}, [userState.objectAdminDetails.objectAdmin]);

	const handleSubmit = (e) => {
		e.preventDefault();

		let objectAdmin = {
			Id: userState.objectAdminDetails.objectAdmin.Id,
			EntityDTO: { Email: email, Name: name, ObjectId: objectId, ObjectName: objectName, Surname: surname, Address: address, PhoneNumber: phoneNumber },
		};
		userService.updateObjectAdmin(objectAdmin, dispatch);
	};

	return (
		<form className="forms-sample" method="put" onSubmit={handleSubmit}>
			<div className="form-group">
				<label for="emailAddress">Email address</label>
				<input type="email" required readOnly value={email} className="form-control" id="emailAddress" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
			</div>
			<div className="form-group">
				<label for="name">Name</label>
				<input
					type="text"
					readOnly={userState.objectAdminDetails.readOnly}
					required
					value={name}
					className="form-control"
					id="name"
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label for="surname">Surname</label>
				<input
					type="text"
					readOnly={userState.objectAdminDetails.readOnly}
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
					readOnly={userState.objectAdminDetails.readOnly}
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
					readOnly={userState.objectAdminDetails.readOnly}
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
				hidden={userState.objectAdminDetails.readOnly}
				style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}
			>
				Save
			</button>
		</form>
	);
};

export default EditObjectAdminForm;
