import React, { useContext, useEffect, useState } from "react";
import { productConstants } from "../constants/ProductConstants";
import { ProductContext } from "../contexts/ProductContext";
import { productService } from "../services/ProductService";

const EditProductForm = ({ hidden }) => {
	const { productState, dispatch } = useContext(ProductContext);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [measureUnit, setMeasureUnit] = useState("");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [productTypeId, setProductTypeId] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		let product = {
			Id: productState.updateProduct.product.Id,
			EntityDTO: {
				Name: name,
				MeasureUnit: measureUnit,
				Amount: amount,
				Price: price,
				ProductTypeId: productTypeId,
				Description: description,
				Ingredients: productState.updateProduct.product.EntityDTO.Ingredients,
				SideDishes: productState.updateProduct.product.EntityDTO.SideDishes,
			},
		};

		dispatch({ type: productConstants.UPDATE_PRODUCT_SUBMIT_FIRST_PAGE, product });
	};

	useEffect(() => {
		const getProductTypesHandler = async () => {
			await productService.findAllProductTypes(dispatch);
		};
		getProductTypesHandler();

		setPrice(productState.updateProduct.product.EntityDTO.Price);
		setName(productState.updateProduct.product.EntityDTO.Name);
		setMeasureUnit(productState.updateProduct.product.EntityDTO.MeasureUnit);
		setAmount(productState.updateProduct.product.EntityDTO.Amount);
		setDescription(productState.updateProduct.product.EntityDTO.Description);
		setProductTypeId(productState.updateProduct.product.EntityDTO.ProductTypeId);
	}, [dispatch, productState.updateProduct.product.EntityDTO]);

	return (
		<React.Fragment>
			<form className="forms-sample" method="post" onSubmit={handleSubmit} hidden={hidden}>
				<div className="row">
					<div className="col-md-12 grid-margin stretch-card">
						<div className="card border-0">
							<div className="card-body">
								<div className="form-group">
									<label className="row" for="productName">
										Product name
									</label>
									<input type="text" required className="form-control row" id="productName" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} />
								</div>
								<div className="form-group">
									<label className="row" for="name">
										Select measure unit
									</label>
									<select className="custom-select my-1 mr-sm-2 row" id="select-restaurant" value={measureUnit} onChange={(e) => setMeasureUnit(e.target.value)}>
										<option disabled selected value="">
											Select measure unit
										</option>
										<option value="kom">kom</option>
										<option value="g">g</option>
										<option value="kg">kg</option>
										<option value="ml">ml</option>
										<option value="l">l</option>
									</select>
								</div>
								<div className="form-group">
									<label for="amount" className="row">
										Amount
									</label>
									<input type="number" required className="form-control row" id="amount" min="1" value={amount} placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
								</div>
								<div className="form-group">
									<label for="price" className="row">
										Price
									</label>
									<input
										type="number"
										step={0.01}
										required
										value={price}
										className="form-control row"
										id="price"
										min="1"
										placeholder="Price"
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<label for="description" className="row">
										Product description
									</label>
									<input type="text" className="form-control row" id="description" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
								</div>
								<div className="form-group">
									<label for="name" className="row">
										Select product type
									</label>
									<select className="custom-select my-1 mr-sm-2 row" id="select-restaurant" value={productTypeId} onChange={(e) => setProductTypeId(e.target.value)}>
										<option disabled selected value="">
											Select type
										</option>
										{productState.updateProduct.productTypes.map((productType) => {
											return (
												<option value={productType.Id} key={productType.Id}>
													{productType.EntityDTO.Name}
												</option>
											);
										})}
									</select>
								</div>
								<div className="form-group">
									<button type="submit" className="btn btn-primary float-right row">
										Next
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</React.Fragment>
	);
};

export default EditProductForm;
