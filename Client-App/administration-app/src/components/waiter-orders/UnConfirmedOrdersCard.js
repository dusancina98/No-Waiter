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
                    {orderState.waiterOrders.UnConfirmedOrders.map((order) => {
						return (
                            <UnConfirmedOrderItem order = {order}/>    
                        )})}
                
                </ul>
            </div>
		</React.Fragment>
	);
};

export default UnConfirmedOrdersCard;
