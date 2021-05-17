import React from "react";
import Header from "../components/Header";
import WaiterDetailsModal from "../components/modals/WaiterDetailsModal";
import SideBar from "../components/SideBar";
import WaiterTable from "../components/WaiterTable";
import UserContextProvider from "../contexts/UserContext";

const ListWaitersPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<UserContextProvider>
							<WaiterTable />
							<WaiterDetailsModal />
						</UserContextProvider>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListWaitersPage;
