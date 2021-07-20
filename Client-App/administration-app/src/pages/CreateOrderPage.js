import React from "react";
import CreateOrderProductList from "../components/create-orders/CreateOrderProductList";
import CreateOrderSidebar from "../components/create-orders/CreateOrderSidebar";
import Header from "../components/Header";
import ProductsTabs from "../components/ProductsTabs";
import SelectedProductCategoryTitle from "../components/SelectedProductCategoryTitle";
import SideBar from "../components/SideBar";
import ObjectContextProvider from "../contexts/ObjectContext";
import OrderContextProvider from "../contexts/OrderContext";
import ProductContextProvider from "../contexts/ProductContext";

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
													<div id="portfolio" className="portfolio">
														<div className="container ">
															<ProductsTabs />
															<SelectedProductCategoryTitle />
															<div className="row portfolio-container">
																<div className="row w-100 ">
																	<CreateOrderProductList />
																	<CreateOrderSidebar />
																</div>
															</div>
														</div>
													</div>
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
