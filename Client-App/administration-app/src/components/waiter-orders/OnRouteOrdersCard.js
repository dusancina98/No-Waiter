import React, { useEffect, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { orderService } from "../../services/OrderService"
import OnRouteOrderItem from "./OnRouteOrderItem";

const OnRouteOrdersCard = () => {
	const { orderState, dispatch } = useContext(OrderContext);

    useEffect(() => {
		const getOnRouteOrders = async () => {
			await orderService.findAllOnRouteOrders(dispatch);
		};
		getOnRouteOrders();
	}, [dispatch]);

	return (
		<React.Fragment>
			<div className="card" style= {{"width":"auto"}} >
                <div className="card-header text-center" style={{"backgroundColor":"DodgerBlue"}}>
                    On-Route
                </div>
                <ul className="list-group list-group-flush" >
					{orderState.waiterOrders.OnRouteOrders.length!==0? 
					<div>
						{orderState.waiterOrders.OnRouteOrders.map((order) => {
							return (
								<OnRouteOrderItem order = {order}/>    
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

export default OnRouteOrdersCard;