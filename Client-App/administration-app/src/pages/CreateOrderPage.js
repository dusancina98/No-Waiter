import React from "react";
import CreateOrderWrapper from "../components/create-orders/CreateOrderWrapper";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import ObjectContextProvider from "../contexts/ObjectContext";
import OrderContextProvider from "../contexts/OrderContext";
import ProductContextProvider from "../contexts/ProductContext";
import TableContextProvider from "../contexts/TableContext";

const CreateOrderPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
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
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default CreateOrderPage;
