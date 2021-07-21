import React from "react";
import CreateOrderWrapper from "../components/create-orders/CreateOrderWrapper";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ObjectContextProvider from "../contexts/ObjectContext";
import OrderContextProvider from "../contexts/OrderContext";
import ProductContextProvider from "../contexts/ProductContext";
import TableContextProvider from "../contexts/TableContext";

const CreateOrderPage = () => {
	return (
		<React.Fragment>
			<div className="container-scroller">
				<SideBar />
				<div className="container-fluid page-body-wrapper">
					<Header />
					<div className="main-panel">
						<div className="row">
							<div className="col-12 grid-margin stretch-card">
								<div className="card">
									<div className="card-body">
										<h4 className="card-title">Create order</h4>

										<ObjectContextProvider>
											<ProductContextProvider>
												<OrderContextProvider>
													<TableContextProvider>
														<CreateOrderWrapper />
													</TableContextProvider>
												</OrderContextProvider>
											</ProductContextProvider>
										</ObjectContextProvider>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default CreateOrderPage;
