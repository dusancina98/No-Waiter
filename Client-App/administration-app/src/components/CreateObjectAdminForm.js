import React, { useContext, useEffect, useState } from "react";
import { ObjectContext } from "../contexts/ObjectContext";
import { UserContext } from "../contexts/UserContext";
import { objectService } from "../services/ObjectService";
import { userService } from "../services/UserService";

const CreateObjectAdminForm = () => {
	const { userState, dispatch } = useContext(UserContext);
	const objectContext = useContext(ObjectContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [surname, setSurname] = useState("");
	const [objectId, setObjectId] = useState("");
	const [objectName, setObjectName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		let objectAdmin = { Email: email, Name: name, Surname: surname, ObjectId: objectId, ObjectName: objectName };
		userService.createObjectAdmin(objectAdmin, dispatch);
	};

	useEffect(() => {
		const getObjectsHandler = async () => {
			await objectService.findAll(objectContext.dispatch);
		};
		getObjectsHandler();
	}, [objectContext.dispatch]);

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
					<label for="name">Select restaurant</label>
					<select
						className="custom-select my-1 mr-sm-2 "
						id="select-restaurant"
						onChange={(e) => {
							setObjectId(e.target.value);
							setObjectName(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text);
						}}
					>
						<option disabled selected value="">
							Select restaurant
						</option>
						{objectContext.objectState.objects.map((object) => {
							return (
								<option value={object.Id} key={object.Id}>
									{object.EntityDTO.Name}
								</option>
							);
						})}
					</select>
				</div>
				<button type="submit" className="btn btn-primary mr-2">
					Submit
				</button>
			</form>
			<div hidden={!userState.createObjectAdmin.showSuccessMessage} className="form-group text-center" style={{ fontSize: "1.3rem" }}>
				You successfully created new object admin
			</div>
			<div hidden={!userState.createObjectAdmin.showError} className="form-group text-center text-danger" style={{ fontSize: "1.1rem" }}>
				{userState.createObjectAdmin.errorMessage}
			</div>
		</React.Fragment>
	);
};

export default CreateObjectAdminForm;
