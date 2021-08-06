import React from "react";
import CreateObjectForm from "../components/CreateObjectForm";
import ObjectContextProvider from "../contexts/ObjectContext";
import HeaderAndSideBarWrapper from "../components/HeaderAndSideBarWrapper";

const CreateObjectPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<div className="content-wrapper">
						<div className="row">
							<div className="col-md-6 grid-margin stretch-card">
								<div className="card">
									<div className="card-body">
										<h4 className="card-title">Add new restaurant</h4>
										<ObjectContextProvider>
											<CreateObjectForm />
										</ObjectContextProvider>
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
				</div>
			</HeaderAndSideBarWrapper>

		</React.Fragment>
	);
};

export default CreateObjectPage;
