import CreateOrderItemDetailsModal from "../modals/CreateOrderItemDetailsModal";
import SelectOrderType from "./SelectOrderType";
import CreateOrderProductList from "./CreateOrderProductList";
import CreateOrderSidebar from "./CreateOrderSidebar";
import CreateOrderTableListSelect from "./CreateOrderTableListSelect";
import { useContext, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import CreateOrderDeliveryInfo from "./CreateOrderDeliveryInfo";
import SuccessAlert from "../messages/SuccessAlert";
import FailureAlert from "../messages/FailureAlert";
import { orderConstants } from "../../constants/OrderConstants";

const CreateOrderWrapper = () => {
	const { orderState, dispatch } = useContext(OrderContext);

	const [address, setAddress] = useState("");
	const [estimatedTime, setEstimatedTime] = useState(10);

	return (
		<div id="portfolio" className="portfolio">
			<div className="container ">
					<SuccessAlert
						hidden={!orderState.createOrder.showSuccessMessage}
						header="Success"
						message={orderState.createOrder.successMessage}
						handleCloseAlert={() => dispatch({ type: orderConstants.HIDE_CREATE_ORDER_MESSAGES })}
					/>
					<FailureAlert
						hidden={!orderState.createOrder.showError}
						header="Error"
						message={orderState.createOrder.errorMessage}
						handleCloseAlert={() => dispatch({ type: orderConstants.HIDE_CREATE_ORDER_MESSAGES })}
					/>
				<div className="row portfolio-container">
					<div className={orderState.createOrder.pageVisible === 6 ? "row w-100 justify-content-center" : "row w-100 "}>
						<SelectOrderType />
						<CreateOrderProductList />
						<CreateOrderTableListSelect />
						<CreateOrderDeliveryInfo setAddress={setAddress} estimatedTime={estimatedTime} setEstimatedTime={setEstimatedTime} />
						<CreateOrderSidebar address={address} estimatedTime={estimatedTime} />
						<CreateOrderItemDetailsModal />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateOrderWrapper;
