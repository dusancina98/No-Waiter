import { colorConstants } from "../constants/ColorConstants";
import { capitalizeFirstLetter } from "../helpers/string-util";

const ProductItem = (props) => {
	return (
		<div className="col-12 portfolio-item">
			<hr />
			<div className="row">
				<div className="col-8">
					<h3>{props.name}</h3>
					<p>
						{props.ingredients.map((ingredient) =>
							props.ingredients.indexOf(ingredient) === props.ingredients.length - 1
								? capitalizeFirstLetter(ingredient.EntityDTO.Name)
								: capitalizeFirstLetter(ingredient.EntityDTO.Name + ", ")
						)}
					</p>
					<p>
						{props.sideDishes.map((sideDish) =>
							props.sideDishes.indexOf(sideDish) === props.sideDishes.length - 1 ? capitalizeFirstLetter(sideDish.EntityDTO.Name) : capitalizeFirstLetter(sideDish.EntityDTO.Name + ", ")
						)}
					</p>

					<h4 style={{ color: colorConstants.COLOR_BLUE }}>RSD {Number(props.price).toFixed(2)}</h4>
				</div>
				<div className="col-4 ">
					<a href="portfolio-details/portfolio-details2.html">
						<img src={props.imagePath} className="img-fluid rounded" alt="" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
