import React from "react";
import HeaderAndSideBarWrapper from "../components/HeaderAndSideBarWrapper";
import CreateProductCategoryModal from "../components/modals/CreateProductCategoryModal";
import CreateProductModal from "../components/modals/CreateProductModal";
import EditProductModal from "../components/modals/EditProductModal";
import ObjectInfoHeader from "../components/ObjectInfoHeader";
import ProductMenu from "../components/ProductMenu";
import ObjectContextProvider from "../contexts/ObjectContext";
import ProductContextProvider from "../contexts/ProductContext";

const ObjectDetailsPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<ObjectContextProvider>
						<ObjectInfoHeader/>
						<div className="row">
							<div className="col-12 grid-margin stretch-card">
								<div className="card">
									<div className="card-body">
										<ProductContextProvider>
											<CreateProductModal />
											<EditProductModal />
											<CreateProductCategoryModal />
											<ProductMenu />
										</ProductContextProvider>
									</div>
								</div>
							</div>
						</div>
					</ObjectContextProvider>
				</div>
			</HeaderAndSideBarWrapper>
			
		</React.Fragment>
	);
};

export default ObjectDetailsPage;
