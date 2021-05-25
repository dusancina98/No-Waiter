import React, { useContext } from "react";
import { modalConstants } from "../constants/ModalConstants";
import { productConstants } from "../constants/ProductConstants";
import { ProductContext } from "../contexts/ProductContext";
import FailureAlert from "./FailureAlert";
import ObjectSidebar from "./ObjectSidebar";
import ProductList from "./ProductList";
import ProductsTabs from "./ProductsTabs";
import SuccessAlert from "./SuccessAlert";

const ProductMenu = () => {
	const { productState, dispatch } = useContext(ProductContext);

	const handleOpenCreateProductModal = () => {
		dispatch({ type: modalConstants.SHOW_CREATE_PRODUCT_MODAL, category: productState.selectedCategory });
	};

	return (
		<React.Fragment>
			<SuccessAlert
				hidden={!productState.showSuccessMessage}
				header="Success"
				message={productState.successMessage}
				handleCloseAlert={() => dispatch({ type: productConstants.CATEGORY_CREATE_REQUEST })}
			/>
			<FailureAlert
				hidden={!productState.showErrorMessage}
				header="Error"
				message={productState.errorMessage}
				handleCloseAlert={() => dispatch({ type: productConstants.CATEGORY_CREATE_REQUEST })}
			/>

			<div id="portfolio" className="portfolio">
				<div class="container">
					<ProductsTabs />
					{productState.selectedCategory.EntityDTO.Name !== "" && (
						<div>
							<h2>
								{productState.selectedCategory.EntityDTO.Name}{" "}
								<button
									type="button"
									data-toggle="tooltip"
									title="Add new product"
									onClick={handleOpenCreateProductModal}
									className="btn btn-outline-secondary btn-rounded btn-icon border-0"
								>
									<i class="mdi mdi-plus text-dark"></i>
								</button>
							</h2>
						</div>
					)}
					<div className="row portfolio-container">
						<div className="row w-100">
							<ProductList />
							<ObjectSidebar />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProductMenu;
