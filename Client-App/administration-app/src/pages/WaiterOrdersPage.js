import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import WaiterOrdersCardList from "../components/waiter-orders/WaiterOrdersCardList";
import OrderContextProvider from "../contexts/OrderContext"

const WaiterOrdersPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
                    <OrderContextProvider>
                        <WaiterOrdersCardList/>
                    </OrderContextProvider>

                        
				    </div>
                </div>
			</div>
		</React.Fragment>
	);
};

export default WaiterOrdersPage;
