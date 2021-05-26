import React from "react";
import DelivererTable from "../components/DelivererTable";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import UserContextProvider from "../contexts/UserContext";

const ListOfDelivererPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<UserContextProvider>
                            <DelivererTable/>
						</UserContextProvider>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListOfDelivererPage;