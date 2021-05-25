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
		<div className="col-8">
			{productState.showedProducts.map((product) => {
				console.log(product);
				return (
					<ProductItem
						imagePath={product.EntityDTO.Image}
						key={product.Id}
						name={product.EntityDTO.Name}
						price={product.EntityDTO.Price}
						sideDishes={product.EntityDTO.SideDishes}
						ingredients={product.EntityDTO.Ingredients}
					/>
				);
			})}
		</div>
	);
};

export default ProductList;
