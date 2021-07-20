import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { productService } from "../services/ProductService";
import ProductItem from "./ProductItem";

const ProductList = () => {
	const { productState, dispatch } = useContext(ProductContext);

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
				return <ProductItem key={product.Id} product={product} />;
			})}
		</div>
	);
};

export default ProductList;
