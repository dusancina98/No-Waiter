import React from "react";
import CreateOrderWrapper from "../components/CreateOrderWrapper";
import OrderContextProvider from "../contexts/OrderContext";

const CreateOrderPage = () => {

	const handleClickOnBack = () =>{
		window.location = "#/home";
	}

	return (
		<React.Fragment>
				<div className="create-order-header d-md-flex align-items-center justify-content-end">
					<a onClick={()=>handleClickOnBack()} class="btn btn-circle-exit mr-2 d-flex justify-content-center align-items-center" data-toggle="collapse" href="#/choose" aria-expanded="false" aria-controls="collapseExample">
						<div style={{'fontSize':'25px'}}>
							X
						</div>
					</a>
				</div>
				<div className="container-fluid ">
					<div className="col-12 grid-margin stretch-card">
						<div className="card-body">
							<OrderContextProvider>
								<CreateOrderWrapper/>
							</OrderContextProvider>
						</div>
					</div>
				</div>
		</React.Fragment>
	);
};

export default CreateOrderPage;