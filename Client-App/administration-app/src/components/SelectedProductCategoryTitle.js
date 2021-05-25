import React, { useContext } from "react";
import { modalConstants } from "../constants/ModalConstants";
import { ProductContext } from "../contexts/ProductContext";

const SelectedProductCategoryTitle = () => {
	const { productState, dispatch } = useContext(ProductContext);

	const handleOpenCreateProductModal = () => {
		dispatch({ type: modalConstants.SHOW_CREATE_PRODUCT_MODAL, category: productState.selectedCategory });
	};

	return (
		<React.Fragment>
			{productState.selectedCategory.EntityDTO.Name !== "" && (
				<div>
					<h2>
						{productState.selectedCategory.EntityDTO.Name}{" "}
						<button type="button" data-toggle="tooltip" title="Add new product" onClick={handleOpenCreateProductModal} className="btn btn-outline-secondary btn-rounded btn-icon border-0">
							<i class="mdi mdi-plus text-dark"></i>
						</button>
					</h2>
				</div>
			)}{" "}
		</React.Fragment>
	);
};

export default SelectedProductCategoryTitle;
