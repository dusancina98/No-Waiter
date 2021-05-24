import React, { useContext, useEffect } from "react";
import { modalConstants } from "../constants/ModalConstants";
import { productConstants } from "../constants/ProductConstants";
import { ProductContext } from "../contexts/ProductContext";
import { productService } from "../services/ProductService";

const ProductsTabs = () => {
	const { productState, dispatch } = useContext(ProductContext);

	const handleOpenCreateCategoryModal = () => {
		dispatch({ type: modalConstants.SHOW_CREATE_CATEGORY_MODAL });
	};

	const filterProducts = (category) => {
		if (category === "*") dispatch({ type: productConstants.DISABLE_PRODUCTS_FILTER });
		else dispatch({ type: productConstants.FILTER_PRODUCTS_BY_CATEGORY, filter: category });
	};

	useEffect(() => {
		const getProductCategoriesHandler = async () => {
			await productService.findAllProductCategories(dispatch);
		};
		getProductCategoriesHandler();
	}, [dispatch]);

	return (
		<React.Fragment>
			<div className="row">
				<div className="col-lg-12 d-flex justify-content-center">
					<ul id="portfolio-flters">
						<li onClick={() => filterProducts("*")}>Sve</li>
						{productState.categories.map((category) => {
							return (
								<li onClick={() => filterProducts(category.EntityDTO.Name)} key={category.Id}>
									{category.EntityDTO.Name}
								</li>
							);
						})}
						<button type="button" onClick={handleOpenCreateCategoryModal} className="btn btn-outline-secondary btn-rounded btn-icon border-0">
							<i class="mdi mdi-plus text-dark"></i>
						</button>
					</ul>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProductsTabs;
