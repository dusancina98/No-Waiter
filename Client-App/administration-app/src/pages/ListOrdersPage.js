import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ObjectContextProvider from "../contexts/ObjectContext";
import OrderContextProvider from "../contexts/OrderContext";

const ListOrdersPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<ObjectContextProvider>
							<OrderContextProvider></OrderContextProvider>
						</ObjectContextProvider>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ListOrdersPage;
