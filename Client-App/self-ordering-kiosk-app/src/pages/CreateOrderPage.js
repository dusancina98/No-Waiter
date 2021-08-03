import React from "react";
import CreateOrderWrapper from "../components/CreateOrderWrapper";
import OrderContextProvider from "../contexts/OrderContext";
import ProductContextProvider from "../contexts/ProductContext";

const CreateOrderPage = () => {

	const handleClickOnBack = () =>{
		window.location = "#/home";
	}

	return (
		<React.Fragment>
			<div >
				<div className="create-order-header d-md-flex align-items-center justify-content-end">
					<a onClick={()=>handleClickOnBack()} class="btn btn-circle-exit mr-2 d-flex justify-content-center align-items-center" data-toggle="collapse" href="#/choose" aria-expanded="false" aria-controls="collapseExample">
						<div style={{'fontSize':'25px'}}>
							X
						</div>
					</a>
				</div>
				<div className="ml-5 mt-2">
					<ProductContextProvider>
						<OrderContextProvider>
							<CreateOrderWrapper/>
						</OrderContextProvider>
					</ProductContextProvider>
				</div>
			</div>
			
		</React.Fragment>
	);
};

export default CreateOrderPage;