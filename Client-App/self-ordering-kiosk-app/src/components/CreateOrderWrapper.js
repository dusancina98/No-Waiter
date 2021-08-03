import { useContext, useState } from "react";
import { OrderContext } from "../contexts/OrderContext";
import CreateOrderProductList from "./CreateOrderProductList";
import ProductsTabs from "./ProductsTabs";

const CreateOrderWrapper = () => {
	const { orderState } = useContext(OrderContext);

	return (
		<div className="row portfolio-container">
			<div className="row w-100 h-100 justify-content-center">
                <div className="col-2 p-2" hidden={orderState.createOrder.pageVisible !== 1}>
                    <ProductsTabs/> 
                </div>             
                <div className="col-7 p-2">
                    <CreateOrderProductList />
                </div>
                <div className="col-3 p-2">
                    <h1>Korpa</h1>
                </div>
            </div>
    	</div>
	);
};

export default CreateOrderWrapper;
