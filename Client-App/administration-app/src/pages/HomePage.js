import React from "react";
import CreateRestaurantForm from "../components/CreateRestaurantForm";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const HomePage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<CreateRestaurantForm />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default HomePage;
