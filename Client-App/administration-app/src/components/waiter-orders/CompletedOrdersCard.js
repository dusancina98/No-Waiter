import React, { useEffect, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { orderService } from "../../services/OrderService"
import CompletedOrderItem from "./CompletedOrderItem";

const CompletedOrdersCard = () => {
	const { orderState, dispatch } = useContext(OrderContext);

    useEffect(() => {
		const getCompletedOrders = async () => {
			await orderService.findAllCompletedOrders(dispatch);
		};
		getCompletedOrders();
	}, [dispatch]);

	return (
		<React.Fragment>
			<div className="card" style= {{"width":"auto"}} >
                <div className="card-header text-center" style={{"backgroundColor":"green"}}>
                    Completed
                </div>
                <ul className="list-group list-group-flush" >
					{orderState.waiterOrders.CompletedOrders.length!==0? 
					<div>
						{orderState.waiterOrders.CompletedOrders.map((order) => {
							return (
								<CompletedOrderItem order = {order}/>    
						)})}
					</div>:
					<div>
						<li className="list-group-item hover-div--off" style= {{"width":"auto","minHeight":"100px","minWidth":"250px"}}>
							<div className="text-center mt-4"  >
								Nothing here...
							</div>
						</li>
					</div>
					}
                </ul>
            </div>
		</React.Fragment>
	);
};

export default CompletedOrdersCard;

