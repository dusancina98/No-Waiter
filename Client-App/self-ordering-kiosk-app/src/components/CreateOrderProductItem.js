import React from "react";
import { capitalizeFirstLetter } from "../helpers/string-util";

const CreateOrderProductItem = ({ product, handleItemSelect }) => {
	return (
        <React.Fragment>
            <div className="col-4 mb-4" style={{ cursor: "pointer" }} onClick={() => handleItemSelect(product)}>
                <div className="card">
                    <img class="card-img-top" src={product.EntityDTO.Image} alt="Card image cap"/>

                    <div class="card-body">
                        <h4 class="card-title">{product.EntityDTO.Name}</h4>
                        <p class="card-text">
                            {product.EntityDTO.Ingredients.map((ingredient) =>
                                product.EntityDTO.Ingredients.indexOf(ingredient) === product.EntityDTO.Ingredients.length - 1
                                    ? capitalizeFirstLetter(ingredient.EntityDTO.Name)
                                    : capitalizeFirstLetter(ingredient.EntityDTO.Name + ", ")
                            )}
                        </p>
                        <p class="card-text text-right"><b>{product.EntityDTO.Price} RSD</b></p>
                    </div>
                 </div>
			</div>
        </React.Fragment>
	);
};

export default CreateOrderProductItem;
