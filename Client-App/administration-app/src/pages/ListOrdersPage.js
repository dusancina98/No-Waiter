import Header from "../components/Header";
import HeaderAndSideBarWrapper from "../components/HeaderAndSideBarWrapper";
import SideBar from "../components/SideBar";
import ObjectContextProvider from "../contexts/ObjectContext";
import OrderContextProvider from "../contexts/OrderContext";

const ListOrdersPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<ObjectContextProvider>
						<OrderContextProvider></OrderContextProvider>
					</ObjectContextProvider>
				</div>
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default ListOrdersPage;
