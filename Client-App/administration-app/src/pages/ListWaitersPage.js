import React from "react";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import WaiterDetailsModal from "../components/modals/WaiterDetailsModal";
import WaiterTable from "../components/objectadmin-employees/WaiterTable";
import UserContextProvider from "../contexts/UserContext";

const ListWaitersPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<UserContextProvider>
						<WaiterTable />
						<WaiterDetailsModal/>
					</UserContextProvider>
				</div>	
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default ListWaitersPage;
