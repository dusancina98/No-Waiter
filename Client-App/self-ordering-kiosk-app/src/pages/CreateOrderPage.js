import React from "react";
import ChooseOrder from "../components/ChooseOrder";
import ConfirmOrder from "../components/ConfirmOrder";
import CreateOrder from "../components/CreateOrder";
import OrderContextProvider from "../contexts/OrderContext";

const CreateOrderPage = () => {
	
	return (
		<React.Fragment>
			<OrderContextProvider>
				<ChooseOrder/>
				<CreateOrder/>
				<ConfirmOrder/>
			</OrderContextProvider>
		</React.Fragment>
	);
};

export default CreateOrderPage;