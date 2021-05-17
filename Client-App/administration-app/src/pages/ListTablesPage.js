import React from "react";
import Header from "../components/Header";
import ListTableHeader from "../components/ListTableHeader";
import SideBar from "../components/SideBar";
import TableList from "../components/TableList";
import TableContextProvider from "../contexts/TableContext";

const ListTablesPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<TableContextProvider>
							<ListTableHeader />
							<TableList />
						</TableContextProvider>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListTablesPage;
