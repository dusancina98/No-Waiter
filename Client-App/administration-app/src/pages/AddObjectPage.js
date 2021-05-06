import React from "react";
import CreateRestaurantForm from "../components/CreateRestaurantForm";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ObjectContextProvider from "../contexts/ObjectContext";

const AddObjectPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<ObjectContextProvider>
							<CreateRestaurantForm />
						</ObjectContextProvider>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default AddObjectPage;
