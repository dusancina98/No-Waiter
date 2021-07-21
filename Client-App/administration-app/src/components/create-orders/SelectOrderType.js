import React, { useContext } from "react";
import { orderConstants } from "../../constants/OrderConstants";
import { OrderContext } from "../../contexts/OrderContext";

const SelectOrderType = () => {
	const { orderState, dispatch } = useContext(OrderContext);

	return (
		<div className="col-md-8 col-lg-8 col-12 no-gutters" hidden={orderState.createOrder.pageVisible !== 2}>
			<div className="row ">
				<div className="col-12 col-md-4 col-lg-4 text-center mt-2">
					<button type="button" className="btn btn-secondary w-100" style={{ height: "150px" }} onClick={() => dispatch({ type: orderConstants.SET_CREATE_ORDER_TYPE, page: 4 })}>
						Delivery
					</button>
				</div>
				<div className="col-12 col-md-4 col-lg-4 text-center mt-2">
					<button type="button" className="btn btn-secondary w-100" style={{ height: "150px" }} onClick={() => dispatch({ type: orderConstants.SET_CREATE_ORDER_TYPE, page: 3 })}>
						Dine in
					</button>
				</div>
				<div className="col-12 col-md-4 col-lg-4 text-center mt-2">
					<button type="button" className="btn btn-secondary w-100" style={{ height: "150px" }} onClick={() => dispatch({ type: orderConstants.SET_CREATE_ORDER_TYPE, page: 6 })}>
						Take away
					</button>
				</div>
			</div>
		</div>
	);
};

export default SelectOrderType;
