import React, {useContext} from "react";
import CreateOrderWrapper from "../components/CreateOrderWrapper";
import { OrderContext } from "../contexts/OrderContext";
import ProductContextProvider from "../contexts/ProductContext";

const CreateOrder = () => {
    const { orderState } = useContext(OrderContext);

	const handleClickOnBack = () =>{
		window.location = "#/home";
	}
	
	return (
		<React.Fragment>
				<div hidden={orderState.pageVisible!==2}>
					<div className="create-order-header d-md-flex align-items-center justify-content-end">
						<a onClick={()=>handleClickOnBack()} class="btn btn-circle-exit mr-2 d-flex justify-content-center align-items-center" data-toggle="collapse" href="#/choose" aria-expanded="false" aria-controls="collapseExample">
							<div style={{'fontSize':'25px'}}>
								X
							</div>
						</a>
					</div>
					<div className="ml-5 mt-2">
						<ProductContextProvider>
							<CreateOrderWrapper/>
						</ProductContextProvider>
					</div>
				</div>
		</React.Fragment>
	);
};

export default CreateOrder;