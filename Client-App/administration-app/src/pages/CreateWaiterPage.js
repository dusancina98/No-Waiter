import React from "react";
import CreateWaiterForm from "../components/objectadmin-employees/CreateWaiterForm";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import UserContextProvider from "../contexts/UserContext";

const CreateWaiterPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<div className="content-wrapper">
						<div className="row">
							<div className="col-md-6 grid-margin stretch-card">
								<div className="card">
									<div className="card-body">
										<h4 className="card-title">Add new waiter</h4>
										<UserContextProvider>
											<CreateWaiterForm />
										</UserContextProvider>
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
				</div>
			</HeaderAndSideBarWrapper>
					
		</React.Fragment>
	);
};

export default CreateWaiterPage;
