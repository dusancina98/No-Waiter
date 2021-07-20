import React, { useContext } from "react";
import { orderConstants } from "../../constants/OrderConstants";
import { OrderContext } from "../../contexts/OrderContext";
import OrderItem from "./OrderItem";

const OrderItemList = () => {
	const { orderState, dispatch } = useContext(OrderContext);

	const setProductCount = (id, count) => {
		dispatch({ type: orderConstants.SET_PRODUCT_COUNT_TO_ORDER, id, count });
	};

	const deleteFromShoppingCart = (id) => {
		dispatch({ type: orderConstants.REMOVE_PRODUCT_FROM_ORDER, id });
	};

	return (
		<React.Fragment>
			{orderState.createOrder.items.map((item) => {
				console.log(item);
				return (
					<React.Fragment>
						<OrderItem
							id={item.id}
							key={item.id}
							name={item.name}
							count={item.count}
							price={item.price}
							imageUrl={item.imagePath}
							setProductCount={setProductCount}
							deleteFromShoppingCart={deleteFromShoppingCart}
						/>
						<hr />
					</React.Fragment>
				);
			})}
		</React.Fragment>
	);
};

export default OrderItemList;
