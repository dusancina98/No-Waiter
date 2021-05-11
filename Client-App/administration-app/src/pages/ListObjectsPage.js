import React from "react";
import Header from "../components/Header";
import ObjectDetailsModal from "../components/modals/ObjectDetailsModal";
import ObjectList from "../components/ObjectList";
import SideBar from "../components/SideBar";
import ModalContextProvider from "../contexts/ModalContext";
import ObjectContextProvider from "../contexts/ObjectContext";

const ListObjectPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<ModalContextProvider>
							<ObjectContextProvider>
								<ObjectList />
							</ObjectContextProvider>

							<ObjectDetailsModal />
						</ModalContextProvider>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListObjectPage;
