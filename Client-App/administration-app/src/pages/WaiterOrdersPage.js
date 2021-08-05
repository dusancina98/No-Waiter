import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import WaiterOrdersCardList from "../components/waiter-orders/WaiterOrdersCardList";
import OrderContextProvider from "../contexts/OrderContext"
import Notiflix from "notiflix";

const WaiterOrdersPage = () => {
	
	Notiflix.Notify.init({
		width: '280px',
		position: 'right-bottom',
		distance: '10px',
		opacity: 1,
		timeout: 3000,
	  });

	const notifyManager = (type, message) =>{
		switch(type){
			case 'SUCCESS' : Notiflix.Notify.success(message); break;
			case 'FAILURE' : Notiflix.Notify.failure(message); break;
			default : Notiflix.Notify.warning('We have some internal problem')
		}
	}
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
                    <OrderContextProvider>
                        <WaiterOrdersCardList
							notifyManager={notifyManager}/>
                    </OrderContextProvider> 
				    </div>
                </div>
			</div>
		</React.Fragment>
	);
};

export default WaiterOrdersPage;
