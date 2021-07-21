import CreateOrderItemDetailsModal from "../modals/CreateOrderItemDetailsModal";
import SelectOrderType from "./SelectOrderType";
import CreateOrderProductList from "./CreateOrderProductList";
import CreateOrderSidebar from "./CreateOrderSidebar";
import CreateOrderTableListSelect from "./CreateOrderTableListSelect";
import { useContext, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import CreateOrderDeliveryInfo from "./CreateOrderDeliveryInfo";

const CreateOrderWrapper = () => {
	const { orderState } = useContext(OrderContext);

	const [address, setAddress] = useState("");
	const [estimatedTime, setEstimatedTime] = useState(10);

	return (
		<div id="portfolio" className="portfolio">
			<div className="container ">
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
