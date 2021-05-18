import { useContext, useEffect, useState } from "react";
import { colorConstants } from "../constants/ColorConstants";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";

const EditObjectForm = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	const handleObjectUpdate = (e) => {
		e.preventDefault();
		let object = {
			Id: objectState.objectDetails.object.Id,
			EntityDTO: {
				Name: name,
				Email: email,
				PhoneNumber: phoneNumber,
				ImagePath: "assets/images/restaurant.jpg",
				Address: address,
				Blocked: objectState.objectDetails.object.EntityDTO.Blocked,
				Active: objectState.objectDetails.object.EntityDTO.Active,
			},
		};

		objectService.updateObject(object, dispatch);
	};

	useEffect(() => {
		setEmail(objectState.objectDetails.object.EntityDTO.Email);
		setName(objectState.objectDetails.object.EntityDTO.Name);
		setAddress(objectState.objectDetails.object.EntityDTO.Address);
		setPhoneNumber(objectState.objectDetails.object.EntityDTO.PhoneNumber);
	}, [objectState.objectDetails.object]);

	return (
		<form className="forms-sample" method="put" onSubmit={handleObjectUpdate}>
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
			<button
				type="submit"
				className="btn btn-success mt-2"
				hidden={objectState.objectDetails.readOnly}
				style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}
			>
				Save
			</button>
		</form>
	);
};

export default EditObjectForm;
