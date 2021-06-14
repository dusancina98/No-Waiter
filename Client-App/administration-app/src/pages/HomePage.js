import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const HomePage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
					<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
				</div>
			</div>
		</React.Fragment>
	);
};

export default HomePage;
