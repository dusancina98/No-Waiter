import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

const SelectedProductCategoryTitle = () => {
	const { productState } = useContext(ProductContext);


	return (
		<React.Fragment>
			{productState.selectedCategory.EntityDTO.Name !== "" && (
				<div>
					<h2>
						{productState.selectedCategory.EntityDTO.Name}
					</h2>
				</div>
			)}
		</React.Fragment>
	);
};

export default SelectedProductCategoryTitle;
