import React from "react";
import Header from "../components/Header";
import CreateProductCategoryModal from "../components/modals/CreateProductCategoryModal";
import CreateProductModal from "../components/modals/CreateProductModal";
import ProductMenu from "../components/ProductMenu";
import SideBar from "../components/SideBar";
import ProductContextProvider from "../contexts/ProductContext";

const ProductsPage = () => {
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
										<ProductContextProvider>
											<CreateProductModal />
											<CreateProductCategoryModal />
											<ProductMenu />
										</ProductContextProvider>
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

export default ProductsPage;
