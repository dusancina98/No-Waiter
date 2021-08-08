import React from "react";
import HeaderAndSideBarWrapper from "../components/HeaderAndSideBarWrapper";
import ListTableHeader from "../components/ListTableHeader";
import TableList from "../components/TableList";
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
