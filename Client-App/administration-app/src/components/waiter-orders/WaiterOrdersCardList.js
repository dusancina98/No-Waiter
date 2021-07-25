import React, { useContext } from "react";
import FailureAlert from "../FailureAlert";
import { OrderContext } from "../../contexts/OrderContext";
import { orderConstants } from "../../constants/OrderConstants";
import ReadyOrdersCard from "../../components/waiter-orders/ReadyOrdersCard"
import UnConfirmedOrdersCard from "../../components/waiter-orders/UnConfirmedOrdersCard"
import ConfirmedOrdersCard from "../../components/waiter-orders/ConfirmedOrdersCard"
import OnRouteOrdersCard from "./OnRouteOrdersCard";

const WaiterOrdersCardList = () => {
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
                        <UnConfirmedOrdersCard/>
                    </div>
                    <div className="col-sm">
                        <ConfirmedOrdersCard/>
                    </div>
                    <div className="col-sm">
                        <ReadyOrdersCard/>
                    </div>
                    <div className="col-sm">
                        <OnRouteOrdersCard/>            
                    </div>
                                <div className="col-sm">
                                    <div className="card" style= {{"width":"auto"}} >
                                        <div className="card-header text-center" style={{"backgroundColor":"green"}}>
                                            Completed
                                        </div>
                                        <ul className="list-group list-group-flush">
                                        <li className="list-group-item" style= {{"width":"auto","minHeight":"100px","minWidth":"250px"}}>
                                                <div>
                                                    <div className="row align-items-center">
                                                        <div className="col-2 ">
                                                            <div className="row">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="col-7" >
                                                            <div className="row">
                                                                <b>Type</b>: Deliverer
                                                            </div> 
                                                            <div className="row">
                                                                <b>Placed</b>: 3 minutes ago
                                                            </div>
                                                            <div className="row">
                                                                <b>Expired</b>: 15 minutes
                                                            </div>
                                                        </div>
                                                        <div className="col-3" >
                                                            <div className="row">
                                                                <b>1300 RSD</b>
                                                            </div> 
                                                            <div className="row">
                                                                Card
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                        </div>
                    </div>
		</React.Fragment>
	);
};

export default WaiterOrdersCardList;
