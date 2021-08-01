import React, {useContext} from 'react'
import { OrderContext } from '../../../contexts/OrderContext';
import OrderItem from '../../create-orders/OrderItem';

const OrderItemsListSideBarModalView = ({setProductCount,deleteFromShoppingCart}) => {
    const { orderState } = useContext(OrderContext);

    const getOrderSum = () => {
		let sum = 0;
		orderState.orderDetailsModal.order.OrderItems.forEach((item) => {
			sum += item.Count * item.Price;
		});
		return sum;
	};

	return (
        <React.Fragment>
            {orderState.orderDetailsModal.order.OrderItems !== undefined ?
				<div>
					<div className="orderItemsSideBarModalScroll">
						{orderState.orderDetailsModal.order.OrderItems.map((item) => {
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
								<div className="mr-3">
									<b>Total:</b>
									<span style={{ color: "#198ae3" }} className="ml-2">
										<b>{Number(getOrderSum()).toFixed(2)} RSD</b>
									</span>
								</div>
							</div>
							</div>:
                            <div>

                            </div>
							}
        </React.Fragment>
	);
};

export default OrderItemsListSideBarModalView;
