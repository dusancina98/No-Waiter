import React, { useContext } from "react";
import FailureAlert from "../messages/FailureAlert";
import { OrderContext } from "../../contexts/OrderContext";
import { orderConstants } from "../../constants/OrderConstants";
import ReadyOrdersCard from "../../components/waiter-orders/ReadyOrdersCard"
import UnConfirmedOrdersCard from "../../components/waiter-orders/UnConfirmedOrdersCard"
import ConfirmedOrdersCard from "../../components/waiter-orders/ConfirmedOrdersCard"
import OnRouteOrdersCard from "./OnRouteOrdersCard";
import CompletedOrdersCard from "./CompletedOrdersCard";
import OrderDetailsModal from "./modals/OrderDetailsModal";

const WaiterOrdersCardList = ({notifyManager}) => {
    const { orderState,dispatch } = useContext(OrderContext);

	return (
		<React.Fragment>  
            <div className="mt-3 mr-3 ml-3">
                <FailureAlert
					hidden={!orderState.waiterOrders.showErrorMessage}
					header="Error"
					message={orderState.waiterOrders.errorMessage}
					handleCloseAlert={() => dispatch({ type: orderConstants.HIDE_WAITER_ORDER_ERROR_MESSAGE })}
				/>
            </div>  
            <div className="order-container">
                <div className="row ">

                    <div className="col-sm">
                        <UnConfirmedOrdersCard notifyManager={notifyManager}/>
                    </div>
                    <div className="col-sm">
                        <ConfirmedOrdersCard notifyManager={notifyManager}/>
                    </div>
                    <div className="col-sm">
                        <ReadyOrdersCard notifyManager={notifyManager}/>
                    </div>
                    <div className="col-sm">
                        <OnRouteOrdersCard notifyManager={notifyManager}/>            
                    </div>
                    <div className="col-sm">
                        <CompletedOrdersCard/>        
                    </div>
                    <OrderDetailsModal notifyManager={notifyManager}
                        />
                </div>
            </div>
		</React.Fragment>
	);
};

export default WaiterOrdersCardList;
