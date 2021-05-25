import { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { productConstants } from "../constants/ProductConstants";
import { productService } from "../services/ProductService";

const IngredientsAndSideDishForm = ({ hidden }) => {
	const { productState, dispatch } = useContext(ProductContext);

	const [ingredients, setIngredients] = useState([]);
	const [ingredientInput, setIngredientInput] = useState("");

	const [sideDishes, setSideDishes] = useState([]);
	const [sideDishInput, setSideDishInput] = useState("");

	const handleAddIngredient = () => {
		let prom = [...ingredients];
		prom.push({ Id: uuidv4(), Name: ingredientInput });

		setIngredients(prom);
		setIngredientInput("");
	};

	const handleIngredientDelete = (ingredientId) => {
		let prom = ingredients.filter((ingredient) => ingredient.Id !== ingredientId);
		setIngredients(prom);
	};

	const handleAddSideDish = () => {
		let prom = [...sideDishes];
		prom.push({ Id: uuidv4(), Name: sideDishInput });

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

							{ingredients.map((ingredient) => {
								return (
									<div key={ingredient.Id}>
										<label>{ingredient.Name}</label>
										<button type="button" onClick={() => handleIngredientDelete(ingredient.Id)} className="btn btn-outline-secondary btn-rounded btn-icon border-0">
											<i className="mdi mdi-close text-danger"></i>
										</button>
									</div>
								);
							})}
							<div>
								<input type="text" placeholder="Ingredient" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} />
								<button type="button" onClick={handleAddIngredient} disabled={ingredientInput.length === 0} className="btn btn-outline-primary btn-icon=text border-0">
									<i className="mdi mdi-plus mr-1"></i>Add
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-6 grid-margin stretch-card">
					<div className="card border-0">
						<div className="card-body">
							<label>Side dishes</label>

							{sideDishes.map((sideDish) => {
								return (
									<div key={sideDish.Id}>
										<label>{sideDish.Name}</label>
										<button type="button" onClick={() => handleSideDishDelete(sideDish.Id)} className="btn btn-outline-secondary btn-rounded btn-icon border-0">
											<i className="mdi mdi-close text-danger"></i>
										</button>
									</div>
								);
							})}
							<div>
								<input type="text" placeholder="Side dish" value={sideDishInput} onChange={(e) => setSideDishInput(e.target.value)} />
								<button type="button" onClick={handleAddSideDish} disabled={sideDishInput.length === 0} className="btn btn-outline-primary btn-icon=text border-0">
									<i className="mdi mdi-plus mr-1"></i>Add
								</button>
							</div>
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
