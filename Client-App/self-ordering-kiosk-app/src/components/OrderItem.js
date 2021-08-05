import { capitalizeFirstLetter } from "../helpers/string-util";
import InputSpinner from 'react-bootstrap-input-spinner'  

const OrderItem = ({ id, name, count, sideDishes, imageUrl, setProductCount, deleteFromShoppingCart }) => {
	return (
		<div className="row align-items-center">
			<div className="col-12 col-md-6">
				<div className="ml-2">
					<h4>{name}</h4>
					<p>
						{sideDishes.map((sideDish) =>
							sideDishes.indexOf(sideDish) === sideDishes.length - 1 ? capitalizeFirstLetter(sideDish.EntityDTO.Name) : capitalizeFirstLetter(sideDish.EntityDTO.Name + ", ")
						)}
					</p>
					<div className="row shopping-cart-quantity">
						<InputSpinner
							type={'real'}
							precision={1}
							min={1}
							step={1}
							onChange={num=>setProductCount(id,num)}
							value={count}
							variant={'secondary'}
							size="sm"
						/>
					</div>
				</div>
			</div>

			<div className="col-12 col-md-4">
					<div className=" container-img">
						<img src={imageUrl} className="img-fluid rounded" alt="" />
						
					</div>
			</div>
			<div className="col-12 col-md-2">
				<b onClick={()=>deleteFromShoppingCart(id)} style={{ cursor: "pointer" }} className="display-2">X</b>			
			</div>

			
		</div>
	);
};

export default OrderItem;
