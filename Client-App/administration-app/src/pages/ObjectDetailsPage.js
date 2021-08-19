import React from "react";
import HeaderAndSideBarWrapper from "../components/page-addons/HeaderAndSideBarWrapper";
import CreateProductCategoryModal from "../components/modals/CreateProductCategoryModal";
import CreateProductModal from "../components/modals/CreateProductModal";
import EditProductModal from "../components/modals/EditProductModal";
import ObjectDetailsModal from "../components/modals/ObjectDetailsModal";
import ObjectInfoHeader from "../components/objectadmin-objectdetails/ObjectInfoHeader";
import ProductMenu from "../components/objectadmin-objectdetails/ProductMenu";
import ObjectContextProvider from "../contexts/ObjectContext";
import ProductContextProvider from "../contexts/ProductContext";

const ObjectDetailsPage = () => {
	return (
		<React.Fragment>
			<HeaderAndSideBarWrapper>
				<div className="main-panel">
					<ObjectContextProvider>
						<div className="row">
							<div className="col-12 grid-margin stretch-card">
								<div className="card">
									<div className="card-body">
										<ObjectInfoHeader/>
										<ProductContextProvider>
											<CreateProductModal />
											<EditProductModal />
											<CreateProductCategoryModal />
											<ProductMenu />
											<ObjectDetailsModal/>
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
