import React, { useContext } from "react";
import { productConstants } from "../../constants/ProductConstants";
import { ProductContext } from "../../contexts/ProductContext";
import FailureAlert from "../messages/FailureAlert";
import ObjectSidebar from "./ObjectSidebar";
import ProductList from "./ProductList";
import ProductsTabs from "./ProductsTabs";
import SelectedProductCategoryTitle from "./SelectedProductCategoryTitle";
import SuccessAlert from "../messages/SuccessAlert";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { productService } from "../../services/ProductService";

const ProductMenu = () => {
	const { productState, dispatch } = useContext(ProductContext);

	const handleDeleteCategory = (categoryId) =>{
		confirmAlert({
			message: 'Are you sure to do this? If delete category, you will delete all products in this category',
			buttons: [
			  {
				label: 'Yes',
				onClick: () => productService.deleteCategory(categoryId, dispatch)
			  },
			  {
				label: 'No',
			  }
			]
		  });
	}

	return (
		<React.Fragment>
			<SuccessAlert
				hidden={!productState.showSuccessMessage}
				header="Success"
				message={productState.successMessage}
				handleCloseAlert={() => dispatch({ type: productConstants.HIDE_PRODUCT_ALERT_MESSAGE })}
			/>
			<FailureAlert
				hidden={!productState.showErrorMessage}
				header="Error"
				message={productState.errorMessage}
				handleCloseAlert={() => dispatch({ type: productConstants.HIDE_PRODUCT_ALERT_MESSAGE })}
			/>

			<div id="portfolio" className="portfolio">
				<div className="container ">
					<ProductsTabs />
					<SelectedProductCategoryTitle handleDeleteCategory={handleDeleteCategory} />
					<div className="row portfolio-container">
						<div className="row w-100 ">
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
