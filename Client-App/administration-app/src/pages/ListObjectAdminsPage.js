import React from "react";
import Header from "../components/Header";
import ObjectAdminTable from "../components/ObjectAdminTable";
import SideBar from "../components/SideBar";

const ListObjectAdminsPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<ObjectAdminTable />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListObjectAdminsPage;
