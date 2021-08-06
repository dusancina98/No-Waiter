import React from "react";
import DelivererTable from "../components/DelivererTable";
import HeaderAndSideBarWrapper from "../components/HeaderAndSideBarWrapper";
import UserContextProvider from "../contexts/UserContext";

const ListOfDelivererPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<UserContextProvider>
                	    <DelivererTable/>
					</UserContextProvider>
				</div>
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default ListOfDelivererPage;