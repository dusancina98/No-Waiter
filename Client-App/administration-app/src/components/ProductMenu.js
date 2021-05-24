import React, { useContext } from "react";
import { productConstants } from "../constants/ProductConstants";
import { ProductContext } from "../contexts/ProductContext";
import FailureAlert from "./FailureAlert";
import ObjectSidebar from "./ObjectSidebar";
import ProductList from "./ProductList";
import ProductsTabs from "./ProductsTabs";
import SuccessAlert from "./SuccessAlert";

const ProductMenu = () => {
	const { productState, dispatch } = useContext(ProductContext);

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
					<div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
						<div className="row">
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
