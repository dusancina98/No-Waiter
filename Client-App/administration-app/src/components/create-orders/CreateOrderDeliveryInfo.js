import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const CreateOrderDeliveryInfo = ({ setAddress, estimatedTime, setEstimatedTime }) => {
	const { orderState } = useContext(OrderContext);

	return (
		<React.Fragment>
			<div className="col-md-8 col-lg-8 col-12 no-gutters" hidden={orderState.createOrder.pageVisible !== 4}>
				<div className="row">
					<h5 for="time">Estimated time</h5>
					<input type="number" className="col-sm-3" id="time" min="1" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} /> min
				</div>
				<div className="row mt-2">
					<h5 for="address">Address</h5>
					<textarea className="form-control" id="address" rows="3" placeholder="Address..." onChange={(e) => setAddress(e.target.value)}></textarea>
				</div>
			</div>
		</React.Fragment>
	);
};

export default CreateOrderDeliveryInfo;
