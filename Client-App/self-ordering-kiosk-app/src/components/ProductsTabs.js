import React, { useContext, useEffect } from "react";
import { productConstants } from "../constants/ProductConstants";
import { ProductContext } from "../contexts/ProductContext";
import { productService } from "../services/ProductService";

const ProductsTabs = () => {
	const { productState, dispatch } = useContext(ProductContext);

	const filterProducts = (category,id) => {
		if (category === "*") dispatch({ type: productConstants.DISABLE_PRODUCTS_FILTER });
		else dispatch({ type: productConstants.FILTER_PRODUCTS_BY_CATEGORY, filter: category, id });
	};

	useEffect(() => {
		const getProductCategoriesHandler = async () => {
			await productService.findAllProductCategories(dispatch);
		};
		getProductCategoriesHandler();
	}, [dispatch]);

	return (
		<React.Fragment>
			<div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 bhoechie-tab-menu ">
              <div class="list-group overflow-auto">
                <p onClick={() => filterProducts("*",1)} className={productState.selectedCategoryNumber===-1? "list-group-item active text-center d-md-flex align-items-center justify-content-center":"list-group-item text-center d-md-flex align-items-center justify-content-center"}>
                  	Sve
                </p>
				{productState.categories.map((category,id) => {
					return (
						<p onClick={() => filterProducts(category,id)} className={productState.selectedCategoryNumber===id? "list-group-item active text-center d-md-flex align-items-center justify-content-center":"list-group-item text-center d-md-flex align-items-center justify-content-center"}>
                			{category.EntityDTO.Name}
                		</p>
					);
					})}		
               
              </div>
            </div>
			

				
		</React.Fragment>
	);
};

export default ProductsTabs;
