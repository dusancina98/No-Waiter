import React from "react";
import CreateObjectAdminForm from "../components/admin-objectadmins/CreateObjectAdminForm";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import ObjectContextProvider from "../contexts/ObjectContext";
import UserContextProvider from "../contexts/UserContext";

const CreateObjectAdminPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<div className="content-wrapper">
						<div className="row">
							<div className="col-md-6 grid-margin stretch-card">
								<div className="card">
									<div className="card-body">
										<h4 className="card-title">Add new object admin</h4>
										<UserContextProvider>
											<ObjectContextProvider>
												<CreateObjectAdminForm />
											</ObjectContextProvider>
										</UserContextProvider>
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

export default CreateObjectAdminPage;
