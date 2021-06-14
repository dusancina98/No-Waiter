import React from "react";
import DelivererRequestTable from "../components/DelivererRequestTable";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import UserContextProvider from "../contexts/UserContext";

const ListDelivererRequestPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<UserContextProvider>
							<DelivererRequestTable/>
						</UserContextProvider>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListDelivererRequestPage;