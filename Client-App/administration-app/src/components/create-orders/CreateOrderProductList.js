import React, { useContext, useEffect } from "react";
import { modalConstants } from "../../constants/ModalConstants";
import { OrderContext } from "../../contexts/OrderContext";
import { ProductContext } from "../../contexts/ProductContext";
import { productService } from "../../services/ProductService";
import ProductsTabs from "../objectadmin-objectdetails/ProductsTabs";
import SelectedProductCategoryTitle from "../objectadmin-objectdetails/SelectedProductCategoryTitle";
import CreateOrderProductItem from "./CreateOrderProductItem";

const CreateOrderProductList = () => {
	const { productState, dispatch } = useContext(ProductContext);
	const orderCtx = useContext(OrderContext);

	const handleItemSelect = (product) => {
		orderCtx.dispatch({ type: modalConstants.SHOW_ORDER_ITEM_DETAILS_MODAL, product });
		console.log(product);
	};

	useEffect(() => {
		const getOProductssHandler = async () => {
			await productService.findAllProducts(dispatch);
		};
		getOProductssHandler();
	}, [dispatch]);

	return (
		<div className="col-md-8 col-lg-8 col-12 no-gutters" hidden={orderCtx.orderState.createOrder.pageVisible !== 1}>
			<ProductsTabs />
			<SelectedProductCategoryTitle />
			{productState.showedProducts.map((product) => {
				console.log(product);
				return <CreateOrderProductItem key={product.Id} product={product} handleItemSelect={handleItemSelect} />;
			})}
		</div>
	);
};

export default CreateOrderProductList;
