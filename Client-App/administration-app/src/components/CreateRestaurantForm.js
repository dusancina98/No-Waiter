import { useContext, useState } from "react";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";

const CreateRestaurantForm = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		let object = { Name: name, Email: email, PhoneNumber: phoneNumber };
		objectService.createObject(object, dispatch);
	};

	return (
		<div className="content-wrapper">
			<div className="row">
				<div className="col-md-6 grid-margin stretch-card">
					<div className="card">
						<div className="card-body">
							<h4 className="card-title">Add new restaurant</h4>
							<form className="forms-sample" method="post" onSubmit={handleSubmit}>
								<div className="form-group">
									<label for="restaurantName">Restaurant name</label>
									<input type="text" required className="form-control" id="restaurantName" placeholder="Restaurant name" onChange={(e) => setName(e.target.value)} />
								</div>
								<div className="form-group">
									<label for="emailAddress">Email address</label>
									<input type="email" className="form-control" id="emailAddress" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
								</div>
								<div className="form-group">
									<label for="phoneNumber">Phone number</label>
									<input type="text" required className="form-control" id="phoneNumber" placeholder="Phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
								</div>
								<button type="submit" className="btn btn-primary mr-2">
									Submit
								</button>
							</form>
						</div>

						<div hidden={!objectState.createObject.showSuccessMessage} className="form-group text-center" style={{ fontSize: "1.3rem" }}>
							You successfully created new object
						</div>
						<div hidden={!objectState.createObject.showError} className="form-group text-center text-danger" style={{ fontSize: "1.1rem" }}>
							{objectState.createObject.errorMessage}
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
		</div>
	);
};

export default CreateRestaurantForm;
