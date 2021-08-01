import React, { useEffect, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { orderService } from "../../services/OrderService"
import ConfirmedOrderItem from "./ConfirmedOrderItem";

const ConfirmedOrdersCard = ({notifyManager}) => {
	const { orderState, dispatch } = useContext(OrderContext);

    useEffect(() => {
		const getUnConfirmedOrders = async () => {
			await orderService.findAllConfirmedOrders(dispatch);
		};
		getUnConfirmedOrders();
	}, [dispatch]);

	return (
		<React.Fragment>
			<div className="card" style= {{"width":"auto"}} >
                <div className="card-header text-center" style={{"backgroundColor":"GreenYellow"}}>
                    Confirmed
                </div>
                <ul className="list-group list-group-flush" >
					{orderState.waiterOrders.ConfirmedOrders.length!==0? 
					<div>
						{orderState.waiterOrders.ConfirmedOrders.map((order) => {
							return (
								<ConfirmedOrderItem 
									order = {order}
									notifyManager={notifyManager}/>    
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

export default ConfirmedOrdersCard;

