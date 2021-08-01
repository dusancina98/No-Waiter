import React, { useContext, useEffect } from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { ProductContext } from "../../contexts/ProductContext";
import { OrderContext } from "../../contexts/OrderContext";
import { productService } from "../../services/ProductService";
import CreateOrderProductItem from "../create-orders/CreateOrderProductItem";
import ProductsTabs from "../ProductsTabs";
import SelectedProductCategoryTitle from "../SelectedProductCategoryTitle";
import { orderConstants } from "../../constants/OrderConstants";

const ModifyOrderProductList = ({handleClickBack}) => {
	const { productState, dispatch } = useContext(ProductContext);
	const orderCtx = useContext(OrderContext);

	const handleItemSelect = (product) => {
		orderCtx.dispatch({ type: orderConstants.WAITER_MODIFY_ORDER_SHOW_ADD_PRODUCT_SET_DETAILS, product });
		console.log(product);
	};

	useEffect(() => {
		const getOProductssHandler = async () => {
			await productService.findAllProducts(dispatch);
		};
		getOProductssHandler();
	}, [dispatch]);

	return (
		
		<div className="mr-2 no-gutters">
			<button
					type="button"
					className="btn btn-primary border-0 ml-4"
					style={{ backgroundColor: colorConstants.COLOR_BLUE }}
					onClick={() => handleClickBack()}>
				Back
			</button>
			<ProductsTabs />
			<SelectedProductCategoryTitle />
			<div className="productModalScroll">
			{productState.showedProducts.map((product) => {
				console.log(product);
				return <CreateOrderProductItem key={product.Id} product={product} handleItemSelect={handleItemSelect} />;
			})}
			</div>
		</div>
	);
};

export default ModifyOrderProductList;
