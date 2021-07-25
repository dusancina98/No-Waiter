import React, { useEffect, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { orderService } from "../../services/OrderService"
import ReadyOrderItem from "./ReadyOrderItem";

const ReadyOrdersCard = () => {
	const { orderState, dispatch } = useContext(OrderContext);

    useEffect(() => {
		const getReadyOrders = async () => {
			await orderService.findAllReadyOrders(dispatch);
		};
		getReadyOrders();
	}, [dispatch]);

	return (
		<React.Fragment>
			<div className="card" style= {{"width":"auto"}} >
                <div className="card-header text-center" style={{"backgroundColor":"lightgreen"}}>
                    Ready
                </div>
                <ul className="list-group list-group-flush" >
					{orderState.waiterOrders.ReadyOrders.length!==0? 
					<div>
						{orderState.waiterOrders.ReadyOrders.map((order) => {
							return (
								<ReadyOrderItem order = {order}/>    
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

export default ReadyOrdersCard;