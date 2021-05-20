import React from "react";
import Header from "../components/Header";
import ObjectImageForm from "../components/ObjectImageForm";
import SideBar from "../components/SideBar";
import ObjectContextProvider from "../contexts/ObjectContext";

const ObjectDetailsPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<ObjectContextProvider>
							<ObjectImageForm />

							<div className="content-wrapper">
								<div className="row">
									<div className="col-md-6 grid-margin stretch-card">
										<div className="card">
											<div className="card-body">
												<h4 className="card-title">Object</h4>
											</div>
										</div>
									</div>
									<div className="col-md-6 grid-margin stretch-card">
										<div className="card">
											<div className="card-body">
												<img src="assets/images/waiter.jpg" alt="restaurant" className="img-fluid" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</ObjectContextProvider>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ObjectDetailsPage;
