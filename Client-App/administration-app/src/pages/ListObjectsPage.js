import React from "react";
import HeaderAndSideBarWrapper from "../components/HeaderAndSideBarWrapper";
import ObjectDetailsModal from "../components/modals/ObjectDetailsModal";
import ObjectList from "../components/ObjectList";
import ObjectContextProvider from "../contexts/ObjectContext";

const ListObjectPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<ObjectContextProvider>
						<ObjectList />
						<ObjectDetailsModal />
					</ObjectContextProvider>
				</div>
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default ListObjectPage;
