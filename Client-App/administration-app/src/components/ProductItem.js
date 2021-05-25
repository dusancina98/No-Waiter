import { colorConstants } from "../constants/ColorConstants";

const ProductItem = (props) => {
	console.log(props);
	return (
		<div className="col-12 portfolio-item">
			<hr />
			<div className="row">
				<div className="col-8">
					<h2>{props.name}</h2>
					<p> {props.ingredients.map((ingredient) => ingredient.EntityDTO.Name + ",")}</p>
					<p> {props.sideDishes.map((sideDish) => sideDish.EntityDTO.Name + ",")}</p>

					<h4 style={{ color: colorConstants.COLOR_BLUE }}>RSD {props.price}</h4>
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
