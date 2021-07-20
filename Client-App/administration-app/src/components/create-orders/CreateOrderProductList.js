import React, { useContext, useEffect } from "react";
import { orderConstants } from "../../constants/OrderConstants";
import { OrderContext } from "../../contexts/OrderContext";
import { ProductContext } from "../../contexts/ProductContext";
import { productService } from "../../services/ProductService";
import CreateOrderProductItem from "./CreateOrderProductItem";

const CreateOrderProductList = () => {
	const { productState, dispatch } = useContext(ProductContext);
	const orderCtx = useContext(OrderContext);

	const handleItemSelect = (product) => {
		orderCtx.dispatch({
			type: orderConstants.ADD_PRODUCT_TO_ORDER,
			item: { id: product.Id, imagePath: product.EntityDTO.Image, name: product.EntityDTO.Name, price: product.EntityDTO.Price, count: 1 },
		});

		console.log(product);
	};

	useEffect(() => {
		const getOProductssHandler = async () => {
			await productService.findAllProducts(dispatch);
		};
		getOProductssHandler();
	}, [dispatch]);

	return (
		<div className="col-md-8 col-lg-8 col-12 no-gutters">
			{productState.showedProducts.map((product) => {
				console.log(product);
				return <CreateOrderProductItem key={product.Id} product={product} handleItemSelect={handleItemSelect} />;
			})}
		</div>
	);
};

export default CreateOrderProductList;
