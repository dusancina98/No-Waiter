import React from "react";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import ObjectAdminDetailsModal from "../components/modals/ObjectAdminDetailsModal";
import ObjectAdminTable from "../components/admin-objectadmins/ObjectAdminTable";
import UserContextProvider from "../contexts/UserContext";

const ListObjectAdminsPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<UserContextProvider>
						<ObjectAdminTable />
						<ObjectAdminDetailsModal />
					</UserContextProvider>
				</div>
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default ListObjectAdminsPage;
