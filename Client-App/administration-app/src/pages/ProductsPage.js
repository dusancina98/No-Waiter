import React from "react";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import CreateProductCategoryModal from "../components/modals/CreateProductCategoryModal";
import CreateProductModal from "../components/modals/CreateProductModal";
import ProductMenu from "../components/objectadmin-objectdetails/ProductMenu";
import ProductContextProvider from "../contexts/ProductContext";

const ProductsPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
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
			</HeaderAndSideBarWrapper>
		</React.Fragment>
	);
};

export default ProductsPage;
