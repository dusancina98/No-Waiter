import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { colorConstants } from "../constants/ColorConstants";
import { productConstants } from "../constants/ProductConstants";
import { ProductContext } from "../contexts/ProductContext";
import { capitalizeFirstLetter } from "../helpers/string-util";
import { productService } from "../services/ProductService";

const ProductItem = (props) => {
	const { productState, dispatch } = useContext(ProductContext);

	const [showedDetails, setShowedDetails] = useState(false);
	const [image, setImage] = useState("");
	const [showedImage, setShowedImage] = useState(props.product.EntityDTO.Image);
	const [selectedImage, setSelectedImage] = useState(false);

	const imgRef = React.createRef();

	const handleSelectProductImage = () => {};

	const onImageChange = (e) => {
		setImage(e.target.files[0]);
		setSelectedImage(true);

		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			setShowedImage(URL.createObjectURL(img));
		}
	};

	const handleImageDeselect = () => {
		setImage("");
		setShowedImage(props.product.EntityDTO.Image);
		setSelectedImage(false);
	};

	const handleImageChange = () => {
		const formData = new FormData();
		formData.append("image", image, "img");
		productService.updateProductImage(props.product.Id, formData, showedImage, dispatch);
	};

	const handleToggleDetails = () => {
		dispatch({ type: productConstants.PRODUCT_TOGGLE_DETAILS, productId: props.product.Id });
	};

	useEffect(() => {
		setShowedDetails(props.product.Id === productState.productDetails.productId);
	}, [props.product.Id, productState.productDetails.productId]);

	return (
		<div className="col-12 portfolio-item">
			<hr />
			<div className="row container-img " hidden={!showedDetails}>
				<div className="col-12 mb-4">
					<img src={showedImage} className="img-fluid rounded w-100" alt="" />
					<div className="overlay-img rounded">
						<input type="file" ref={imgRef} style={{ display: "none" }} name="image" accept="image/png, image/jpeg" onChange={onImageChange} />

						<button hidden={selectedImage} className="icon-img" data-toggle="tooltip" title="Edit image" onClick={() => imgRef.current.click()}>
							<i class="mdi mdi-pencil"></i>
						</button>
						<div className="icon-img" hidden={!selectedImage}>
							<button data-toggle="tooltip" title="Change image" onClick={handleImageChange}>
								<i className="mdi mdi-upload"></i>
							</button>
							<button data-toggle="tooltip" title="Discard image" onClick={handleImageDeselect}>
								<i className="mdi mdi-close"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row" style={{ cursor: "pointer" }} onClick={handleToggleDetails}>
				<div className="col-12 col-md-8">
					<h3>{props.product.EntityDTO.Name}</h3>
					<p hidden={!showedDetails}>{props.product.EntityDTO.Description}</p>

					<p>
						{props.product.EntityDTO.Ingredients.map((ingredient) =>
							props.product.EntityDTO.Ingredients.indexOf(ingredient) === props.product.EntityDTO.Ingredients.length - 1
								? capitalizeFirstLetter(ingredient.EntityDTO.Name)
								: capitalizeFirstLetter(ingredient.EntityDTO.Name + ", ")
						)}
					</p>
					<p>
						{props.product.EntityDTO.SideDishes.map((sideDish) =>
							props.product.EntityDTO.SideDishes.indexOf(sideDish) === props.product.EntityDTO.SideDishes.length - 1
								? capitalizeFirstLetter(sideDish.EntityDTO.Name)
								: capitalizeFirstLetter(sideDish.EntityDTO.Name + ", ")
						)}
					</p>

					<p hidden={!showedDetails}>
						{props.product.EntityDTO.Amount} x {props.product.EntityDTO.MeasureUnit}
					</p>

					<h4 style={{ color: colorConstants.COLOR_BLUE }}>RSD {Number(props.product.EntityDTO.Price).toFixed(2)}</h4>
				</div>
				<div className="col-12 col-md-4" hidden={showedDetails}>
					{props.product.EntityDTO.Image === "" ? (
						<button type="button" data-toggle="tooltip" title="Add product image" onClick={handleSelectProductImage} className="btn btn-outline-dark btn-icon-text border-0">
							<i className="mdi mdi-plus btn-icon-prepend"></i> Upload
						</button>
					) : (
						<img src={props.product.EntityDTO.Image} className="img-fluid rounded" alt="" />
					)}
				</div>
			</div>
			<hr hidden={!showedDetails} />
			<div className="row" hidden={!showedDetails} onClick={handleToggleDetails}>
				<div className="col-12 col-md-12 d-flex justify-content-end mt-3">
					<button type="button" className="btn btn-primary border-0 mr-4">
						Edit info
					</button>
					<button type="button" className="btn btn-danger border-0 mr-4">
						Delete product
					</button>
				</div>
			</div>
			<hr hidden={!showedDetails} />
		</div>
	);
};

export default ProductItem;
