import React, {useContext} from 'react'
import { OrderContext } from '../contexts/OrderContext';
import OrderItem from '../components/OrderItem'
import { orderConstants } from '../constants/OrderConstants';

const ShoppingCartSideBar = () => {
    const { orderState, dispatch } = useContext(OrderContext);

    const getOrderSum = () => {
		let sum = 0;
		orderState.createOrder.orderItems.forEach((item) => {
			sum += item.Count * item.Price;
		});
		return sum;
	};

	const deleteFromShoppingCart = (id) =>{
		dispatch({ type: orderConstants.REMOVE_ORDER_ITEM_FROM_SHOPPING_CART, id });
	}
	
	const setProductCount = (id,count) =>{
		dispatch({ type: orderConstants.SET_ORDER_ITEM_COUNT, id, count });
	}

	return (
        <React.Fragment>
            {orderState.createOrder.orderItems !== undefined ?
				<div> 
					<div className="orderItemsSideBarModalScroll">
						{orderState.createOrder.orderItems.map((item) => {
						return (
							<React.Fragment>
								<OrderItem
									id={item.Id}
									key={item.Id}
									name={item.Name}
									count={item.Count}
									price={item.Price}
									sideDishes={item.SideDishes}
									imageUrl={item.ImageUrl}
									setProductCount={(id,count)=>setProductCount(id,count)}
									deleteFromShoppingCart={(id)=>deleteFromShoppingCart(id)}
								/>
											<hr />
							</React.Fragment>
									);
								})}
					</div>
				
							<div className="row d-flex justify-content-end mt-3">
								<div className="mr-3 display-4">
									<b>Total:</b>
									<span style={{ color: "#198ae3" }} className="ml-2">
										<b>{Number(getOrderSum()).toFixed(2)} RSD</b>
									</span>
								</div>
							</div>
							</div>:
                            <div className="row">
								
                            </div>
							}
        </React.Fragment>
	);
};

export default ShoppingCartSideBar;
