const CreateRestaurantForm = () => {
	return (
		<div className="content-wrapper">
			<div className="row">
				<div className="col-md-6 grid-margin stretch-card">
					<div className="card">
						<div className="card-body">
							<h4 className="card-title">Add new restaurant</h4>
							<form className="forms-sample">
								<div className="form-group">
									<label for="restaurantName">Restaurant name</label>
									<input type="text" className="form-control" id="restaurantName" placeholder="Restaurant name" />
								</div>
								<div className="form-group">
									<label for="address">Address</label>
									<input type="text" className="form-control" id="address" placeholder="Address" />
								</div>
								<div className="form-group">
									<label for="emailAddress">Email address</label>
									<input type="email" className="form-control" id="emailAddress" placeholder="Email" />
								</div>
								<div className="form-group">
									<label for="phoneNumber">Phone number</label>
									<input type="text" className="form-control" id="phoneNumber" placeholder="Phone number" />
								</div>
								<button type="submit" className="btn btn-primary mr-2">
									{" "}
									Submit{" "}
								</button>
								<button className="btn btn-light">Cancel</button>
							</form>
						</div>
					</div>
				</div>
				<div className="col-md-6 grid-margin stretch-card">
					<div className="card">
						<div className="card-body">
							<h4 className="card-title">Default form</h4>
							<p className="card-description">Basic form layout</p>
							<form className="forms-sample">
								<div className="form-group">
									<label for="exampleInputUsername1">Username</label>
									<input type="text" className="form-control" id="exampleInputUsername1" placeholder="Username" />
								</div>
								<div className="form-group">
									<label for="exampleInputEmail1">Email address</label>
									<input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
								</div>
								<div className="form-group">
									<label for="exampleInputPassword1">Password</label>
									<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
								</div>
								<div className="form-group">
									<label for="exampleInputConfirmPassword1">Confirm Password</label>
									<input type="password" className="form-control" id="exampleInputConfirmPassword1" placeholder="Password" />
								</div>
								<button type="submit" className="btn btn-primary mr-2">
									{" "}
									Submit{" "}
								</button>
								<button className="btn btn-light">Cancel</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateRestaurantForm;
