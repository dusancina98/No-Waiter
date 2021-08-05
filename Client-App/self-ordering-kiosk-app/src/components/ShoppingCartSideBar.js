import React, {useContext} from 'react'
import { OrderContext } from '../contexts/OrderContext';
import OrderItem from '../components/OrderItem'
import { orderConstants } from '../constants/OrderConstants';
import { orderService } from '../services/OrderService';

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

	const handleClickOnFinishOrder = () =>{
		dispatch({ type: orderConstants.FINISH_ORDER });
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
						<div className=" d-flex justify-content-end display-4 mr-2">
							<b>Total:</b>
							<span style={{ color: "#198ae3" }} className="ml-2">
							<b>{Number(getOrderSum()).toFixed(2)} RSD</b>
							</span>
				</div>
						<div className=" d-flex justify-content-end display-4 mt-3 mr-2">
							<button onClick={() => handleClickOnFinishOrder()} type="button" style={{'backgroundColor':'rgb(17, 89, 134)'}} className="btn btn-primary btn-lg">Finish order</button>
						</div>
							</div>
							:
                            <div className="row">
								
                            </div>
							}
        </React.Fragment>
	);
};

export default ShoppingCartSideBar;
