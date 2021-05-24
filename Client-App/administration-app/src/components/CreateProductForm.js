import React, { useContext, useEffect, useState } from "react";
import { productConstants } from "../constants/ProductConstants";
import { ProductContext } from "../contexts/ProductContext";
import { objectService } from "../services/ObjectService";
import { productService } from "../services/ProductService";

const CreateProductForm = () => {
	const { productState, dispatch } = useContext(ProductContext);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [measureUnit, setMeasureUnit] = useState("");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [productTypeId, setProductTypeId] = useState("");

	const [image, setImage] = useState("");
	const imgRef = React.createRef();

	const handleSubmit = (e) => {
		e.preventDefault();

		//let object = { Name: name, Email: email, PhoneNumber: phoneNumber, ImagePath: "assets/images/restaurant.jpg", Address: address };
	};

	const onImageChange = (e) => {
		//e.preventDefault();
		setImage(e.target.files[0]);

		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			dispatch({ type: productConstants.CREATE_PRODUCT_IMAGE_SELECTED, showedImage: URL.createObjectURL(img) });
		}
	};

	const handleImageDeselect = () => {
		dispatch({ type: productConstants.CREATE_PRODUCT_IMAGE_DESELECTED });
	};

	useEffect(() => {
		const getObjectsHandler = async () => {
			await productService.findAllProductTypes(dispatch);
		};
		getObjectsHandler();
	}, [dispatch]);

	return (
		<React.Fragment>
			<form className="forms-sample" method="post" onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-md-6 grid-margin stretch-card">
						<div className="card border-0">
							<div className="card-body">
								<div className="form-group">
									<label className="row" for="productName">
										Product name
									</label>
									<input type="text" required className="form-control row" id="productName" placeholder="Product name" onChange={(e) => setName(e.target.value)} />
								</div>
								<div className="form-group">
									<label className="row" for="name">
										Select measure unit
									</label>
									<select className="custom-select my-1 mr-sm-2 row" id="select-restaurant" onChange={(e) => setMeasureUnit(e.target.value)}>
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
									<label for="price" className="row">
										Price
									</label>
									<input required className="form-control row" id="price" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
								</div>
								<div className="form-group">
									<label for="amount" className="row">
										Amount
									</label>
									<input type="number" required className="form-control row" id="amount" min="1" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
								</div>

								<div className="form-group">
									<label for="name" className="row">
										Select product type
									</label>
									<select className="custom-select my-1 mr-sm-2 row" id="select-restaurant" onChange={(e) => setProductTypeId(e.target.value)}>
										<option disabled selected value="">
											Select type
										</option>
										{productState.createProduct.productTypes.map((productType) => {
											return (
												<option value={productType.Id} key={productType.Id}>
													{productType.EntityDTO.Name}
												</option>
											);
										})}
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6 grid-margin stretch-card">
						<div className="card border-0">
							<div className="card-body row align-items-end">
								<div className="col-12">
									{productState.createProduct.showedImage !== "" && <img src={productState.createProduct.showedImage} alt="product-image" className="img-fluid row" />}
									<input type="file" ref={imgRef} style={{ display: "none" }} name="image" accept="image/png, image/jpeg" onChange={onImageChange} />
									<div className="row d-flex flex-row-reverse">
										<button
											hidden={!productState.createProduct.imageSelected}
											type="button"
											onClick={handleImageDeselect}
											className="btn btn-outline-danger btn-icon-text border-0  mt-4"
										>
											Remove<i className="mdi mdi-close  ml-1 align-middle"></i>
										</button>
										<button
											hidden={productState.createProduct.imageSelected}
											type="button"
											onClick={() => imgRef.current.click()}
											className="btn btn-outline-primary btn-icon-text border-0"
										>
											<i className="mdi mdi-upload btn-icon-prepend"></i> Upload image
										</button>
									</div>
									<div className="form-group">
										<label for="description" className="row">
											Product description
										</label>
										<input type="text" className="form-control row" id="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
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
				</div>
			</form>
		</React.Fragment>
	);
};

export default CreateProductForm;
