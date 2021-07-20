import React from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { capitalizeFirstLetter } from "../../helpers/string-util";

const CreateOrderProductItem = ({ product, handleItemSelect }) => {
	return (
		<div className="col-12 portfolio-item" onClick={() => handleItemSelect(product)}>
			<hr />

			<div className="row" style={{ cursor: "pointer" }}>
				<div className="col-7 col-md-8">
					<h3>{product.EntityDTO.Name}</h3>

					<p>
						{product.EntityDTO.Ingredients.map((ingredient) =>
							product.EntityDTO.Ingredients.indexOf(ingredient) === product.EntityDTO.Ingredients.length - 1
								? capitalizeFirstLetter(ingredient.EntityDTO.Name)
								: capitalizeFirstLetter(ingredient.EntityDTO.Name + ", ")
						)}
					</p>
					<p>
						{product.EntityDTO.SideDishes.map((sideDish) =>
							product.EntityDTO.SideDishes.indexOf(sideDish) === product.EntityDTO.SideDishes.length - 1
								? capitalizeFirstLetter(sideDish.EntityDTO.Name)
								: capitalizeFirstLetter(sideDish.EntityDTO.Name + ", ")
						)}
					</p>

					<p>
						{product.EntityDTO.Amount} x {product.EntityDTO.MeasureUnit}
					</p>

					<h4 style={{ color: colorConstants.COLOR_BLUE }}>RSD {Number(product.EntityDTO.Price).toFixed(2)}</h4>
				</div>
				<div className="col-5 col-md-4">
					<img src={product.EntityDTO.Image} className="img-fluid rounded" alt="" />
				</div>
			</div>
		</div>
	);
};

export default CreateOrderProductItem;
