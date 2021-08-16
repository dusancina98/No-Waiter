import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
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
