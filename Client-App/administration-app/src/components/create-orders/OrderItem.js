import { hasRoles } from "../../helpers/auth-header";
import { capitalizeFirstLetter } from "../../helpers/string-util";

const OrderItem = ({ id, name, count, price, sideDishes, imageUrl, setProductCount, deleteFromShoppingCart, note, hiddenEdited}) => {
	return (
		<div className="row align-items-center" style={{ cursor: "pointer" }}>
			<div className="col-12 col-md-8">
				<div className="ml-2">
					<h4>{name}</h4>
					<p>
						{sideDishes.map((sideDish) =>
							sideDishes.indexOf(sideDish) === sideDishes.length - 1 ? capitalizeFirstLetter(sideDish.EntityDTO.Name) : capitalizeFirstLetter(sideDish.EntityDTO.Name + ", ")
						)}
					</p>
					<div className="row align-items-center">
						<input disabled={hiddenEdited} type="number" className="form-control col-sm-3 ml-3" id="quantity" min="1" value={count} onChange={(e) => setProductCount(id, e.target.value)} />x{" "}
						<span style={{ color: "#198ae3" }}>{Number(price).toFixed(2)} RSD</span>
					</div>
					<div hidden={!hasRoles("ROLE_WAITER")} class="text-wrap mt-2" style={{'width': '250px'}}>
  						<b>Note: </b> {note}
					</div>
				</div>
			</div>
			<div className="col-12 col-md-4">
				<div className="mr-2">
					<div className=" container-img">
						<img src={imageUrl} className="img-fluid rounded" alt="" />
						<div className="overlay-img">
							<button hidden={hiddenEdited} className="btn  shopp-icon-img" data-toggle="tooltip" title="Delete product" onClick={() => deleteFromShoppingCart(id)}>
								<i className="mdi mdi-close"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
