import React from "react";
import Header from "../components/Header";
import ObjectAdminDetailsModal from "../components/modals/ObjectAdminDetailsModal";
import ObjectAdminTable from "../components/ObjectAdminTable";
import SideBar from "../components/SideBar";
import UserContextProvider from "../contexts/UserContext";

const ListObjectAdminsPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<UserContextProvider>
							<ObjectAdminTable />
							<ObjectAdminDetailsModal />
						</UserContextProvider>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListObjectAdminsPage;
