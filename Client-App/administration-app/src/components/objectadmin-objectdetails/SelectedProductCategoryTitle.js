import React, { useContext } from "react";
import { modalConstants } from "../../constants/ModalConstants";
import { ProductContext } from "../../contexts/ProductContext";
import { hasRoles } from "../../helpers/auth-header";

const SelectedProductCategoryTitle = ({handleDeleteCategory}) => {
	const { productState, dispatch } = useContext(ProductContext);

	const handleOpenCreateProductModal = () => {
		dispatch({ type: modalConstants.SHOW_CREATE_PRODUCT_MODAL, category: productState.selectedCategory });
	};

	return (
		<React.Fragment>
			{productState.selectedCategory.EntityDTO.Name !== "" && (
				<div>
					<h2>
						{productState.selectedCategory.EntityDTO.Name}
						<button
							type="button"
							data-toggle="tooltip"
							disabled={!hasRoles("ROLE_OBJADMIN")}
							hidden={!hasRoles("ROLE_OBJADMIN")}
							title="Add new product"
							onClick={() => handleDeleteCategory(productState.selectedCategory.Id)}
							className="btn btn-outline-secondary btn-rounded btn-icon border-0"
						>
							<i className="mdi mdi-delete text-dark"></i>
						</button>
						<button
							type="button"
							data-toggle="tooltip"
							disabled={!hasRoles("ROLE_OBJADMIN")}
							hidden={!hasRoles("ROLE_OBJADMIN")}
							title="Add new product"
							onClick={handleOpenCreateProductModal}
							className="btn btn-outline-secondary btn-rounded btn-icon border-0"
						>
							<i className="mdi mdi-plus text-dark"></i>
						</button>
					
					</h2>
				</div>
			)}
		</React.Fragment>
	);
};

export default SelectedProductCategoryTitle;
