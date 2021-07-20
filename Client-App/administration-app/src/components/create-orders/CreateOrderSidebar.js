import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import OrderItemList from "./OrderItemList";

const CreateOrderSidebar = () => {
	const { orderState } = useContext(OrderContext);

	const getOrderSum = () => {
		let sum = 0;
		orderState.createOrder.items.forEach((item) => {
			sum += item.count * item.price;
		});
		return sum;
	};

	return (
		<div className="col-md-4 col-lg-4 col-12">
			<h3 className="ml-2 mb-3">Order items</h3>

			<OrderItemList />
			<div className="row d-flex justify-content-end">
				<div className="mr-4">
					<b>Total:</b>
					<span style={{ color: "#198ae3" }} className="ml-2">
						<b>{Number(getOrderSum()).toFixed(2)} RSD</b>
					</span>
				</div>
			</div>
		</div>
	);
};

export default CreateOrderSidebar;
