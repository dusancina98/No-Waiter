import React from "react";
import DelivererRequestTable from "../components/admin-deliverers/DelivererRequestTable";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import UserContextProvider from "../contexts/UserContext";

const ListDelivererRequestPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<UserContextProvider>
						<DelivererRequestTable/>
					</UserContextProvider>
				</div>
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default ListDelivererRequestPage;