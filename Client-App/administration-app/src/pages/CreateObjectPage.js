import React from "react";
import CreateObjectForm from "../components/CreateObjectForm";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ObjectContextProvider from "../contexts/ObjectContext";

const CreateObjectPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
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
				</div>
			</div>
		</React.Fragment>
	);
};

export default CreateObjectPage;