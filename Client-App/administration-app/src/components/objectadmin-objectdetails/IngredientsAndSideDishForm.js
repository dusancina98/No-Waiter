import { useContext, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { productConstants } from "../../constants/ProductConstants";
import { productService } from "../../services/ProductService";
import TextItemList from "./TextItemList";

const IngredientsAndSideDishForm = ({ hidden }) => {
	const { productState, dispatch } = useContext(ProductContext);

	const [ingredients, setIngredients] = useState([]);
	const [ingredientInput, setIngredientInput] = useState("");
	const [sideDishes, setSideDishes] = useState([]);
	const [sideDishInput, setSideDishInput] = useState("");

	const handleAddIngredient = () => {
		let prom = [...ingredients];
		prom.push({ Id: uuidv4(), EntityDTO: { Name: ingredientInput } });

		setIngredients(prom);
		setIngredientInput("");
	};

	const handleIngredientDelete = (ingredientId) => {
		let prom = ingredients.filter((ingredient) => ingredient.Id !== ingredientId);
		setIngredients(prom);
	};

	const handleAddSideDish = () => {
		let prom = [...sideDishes];
		prom.push({ Id: uuidv4(), EntityDTO: { Name: sideDishInput } });

		setSideDishes(prom);
		setSideDishInput("");
	};

	const handleSideDishDelete = (sideDishId) => {
		let prom = sideDishes.filter((sideDish) => sideDish.Id !== sideDishId);
		setSideDishes(prom);
	};

	const handleBackClick = () => {
		dispatch({ type: productConstants.CREATE_PRODUCT_BACK_TO_FIRST_PAGE });
	};

	const handleSubmit = () => {
		let product = { ...productState.createProduct.product };
		product.Ingredients = ingredients;
		product.SideDishes = sideDishes;

		productService.createProduct(product, dispatch);
	};

	return (
		<div hidden={hidden}>
			<div className="row">
				<div className="col-md-6 grid-margin stretch-card">
					<div className="card border-0">
						<div className="card-body">
							<label>Ingredients</label>
							<TextItemList
								list={ingredients}
								handleItemDelete={handleIngredientDelete}
								handleItemAdd={handleAddIngredient}
								itemInput={ingredientInput}
								setItemInput={setIngredientInput}
							/>
						</div>
					</div>
				</div>

				<div className="col-md-6 grid-margin stretch-card">
					<div className="card border-0">
						<div className="card-body">
							<label>Side dishes</label>
							<TextItemList list={sideDishes} handleItemDelete={handleSideDishDelete} handleItemAdd={handleAddSideDish} itemInput={sideDishInput} setItemInput={setSideDishInput} />
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<button type="submit" className="btn btn-outline-primary float-left border-0" onClick={handleBackClick}>
						Back
					</button>
				</div>

				<div className="col-md-6">
					<button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default IngredientsAndSideDishForm;
