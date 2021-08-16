import React from "react";
import WaiterOrdersCardList from "../components/waiter-orders/WaiterOrdersCardList";
import OrderContextProvider from "../contexts/OrderContext"
import Notiflix from "notiflix";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import TableContextProvider from "../contexts/TableContext";

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
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<TableContextProvider>
						<OrderContextProvider>
                        	<WaiterOrdersCardList
								notifyManager={notifyManager}/>
                    	</OrderContextProvider> 
					</TableContextProvider>
				</div>
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default WaiterOrdersPage;
