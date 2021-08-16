import React from "react";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import ListTableHeader from "../components/objectadmin-tables/ListTableHeader";
import TableList from "../components/objectadmin-tables/TableList";
import TableContextProvider from "../contexts/TableContext";

const ListTablesPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<TableContextProvider>
						<div className="content-wrapper">
							<ListTableHeader />
							<TableList />
						</div>
					</TableContextProvider>
				</div>	
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default ListTablesPage;
