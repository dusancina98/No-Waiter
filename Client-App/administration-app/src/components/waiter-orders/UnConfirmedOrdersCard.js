import React, { useEffect, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { orderService } from "../../services/OrderService"
import UnConfirmedOrderItem from "./UnConfirmedOrderItem";

const UnConfirmedOrdersCard = () => {
	const { orderState, dispatch } = useContext(OrderContext);

    useEffect(() => {
		const getUnConfirmedOrders = async () => {
			await orderService.findAllUnConfirmedOrders(dispatch);
		};
		getUnConfirmedOrders();
	}, [dispatch]);

	return (
		<React.Fragment>
			<div className="card" style= {{"width":"auto"}} >
                <div className="card-header text-center" style={{"backgroundColor":"orange"}}>
                    Un-Confirmed
                </div>
                <ul className="list-group list-group-flush" >
					{orderState.waiterOrders.UnConfirmedOrders.length!==0? 
					<div>
						{orderState.waiterOrders.UnConfirmedOrders.map((order) => {
							return (
								<UnConfirmedOrderItem order = {order}/>    
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

export default UnConfirmedOrdersCard;
