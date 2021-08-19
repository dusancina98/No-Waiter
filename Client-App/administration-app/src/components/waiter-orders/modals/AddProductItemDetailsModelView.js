import React, {useContext, useState} from 'react'
import { colorConstants } from '../../../constants/ColorConstants';
import { OrderContext } from '../../../contexts/OrderContext';
import { capitalizeFirstLetter } from "../../../helpers/string-util";
import { v4 as uuidv4 } from "uuid";
import MultiSelectListItems from "../../objectadmin-objectdetails/MultiSelectListItems";
import { orderConstants } from '../../../constants/OrderConstants';

const AddProductItemDetailsModelView = ({enableSaveButton}) => {
	const { orderState,dispatch } = useContext(OrderContext);

    const [selectedSideDishes, setSelectedSideDishes] = useState([]);
	const [note, setNote] = useState("");
	const [productCount, setProductCount] = useState(1);

	const handleItemsAddAll = (sideDishes) => {
		setSelectedSideDishes(sideDishes);
	};

	const handleAddSideDish = (sideDish) => {
		console.log(sideDish);
		if (selectedSideDishes.find((sd) => sd.Id === sideDish.Id) === undefined) {
			let prom = [...selectedSideDishes];
			prom.push(sideDish);

			setSelectedSideDishes(prom);
		}
	};

	const handleSideDishDelete = (sideDishId) => {
		let prom = selectedSideDishes.filter((sideDish) => sideDish.Id !== sideDishId);
		setSelectedSideDishes(prom);
	};

	const handleAddItem = () => {
		console.log(orderState.orderDetailsModal.addProductDetails.Id)
		dispatch({
			type: orderConstants.ADD_PRODUCT_TO_ORDER_BY_WAITER,
			item: {
				Id: uuidv4(),
				ProductId: orderState.orderDetailsModal.addProductDetails.Id,
				ImageUrl: orderState.orderDetailsModal.addProductDetails.EntityDTO.Image,
				Name: orderState.orderDetailsModal.addProductDetails.EntityDTO.Name,
				Price: orderState.orderDetailsModal.addProductDetails.EntityDTO.Price,
				SideDishes: selectedSideDishes,
				Count: productCount,
				Note: note,
			},
		});

		enableSaveButton()
		setProductCount(1);
		setNote("");
		setSelectedSideDishes([]);
	};
    
    const handleClickBack = () => {
        dispatch({type: orderConstants.WAITER_MODIFY_ORDER_SHOW_ADD_PRODUCT });
    }

	return (
        <React.Fragment>
            
            <div className="col-12 portfolio-item">
                <button
                        type="button"
                        className="btn btn-primary border-0 mb-2"
                        style={{ backgroundColor: colorConstants.COLOR_BLUE }}
                        onClick={handleClickBack}>
                    Back
                </button>
					<div className="row" >
						<div className="col-7 col-md-8">
							<h3>{orderState.orderDetailsModal.addProductDetails.EntityDTO.Name}</h3>

							<p>
								{orderState.orderDetailsModal.addProductDetails.EntityDTO.Ingredients.map((ingredient) =>
									orderState.orderDetailsModal.addProductDetails.EntityDTO.Ingredients.indexOf(ingredient) ===
									orderState.orderDetailsModal.addProductDetails.EntityDTO.Ingredients.length - 1
										? capitalizeFirstLetter(ingredient.EntityDTO.Name)
										: capitalizeFirstLetter(ingredient.EntityDTO.Name + ", ")
								)}
							</p>

							<p>
								{orderState.orderDetailsModal.addProductDetails.EntityDTO.Amount} x {orderState.orderDetailsModal.addProductDetails.EntityDTO.MeasureUnit}
							</p>

							<h4 style={{ color: colorConstants.COLOR_BLUE }}>RSD {Number(orderState.orderDetailsModal.addProductDetails.EntityDTO.Price).toFixed(2)}</h4>
						</div>
						<div className="col-5 col-md-4">
							<img src={orderState.orderDetailsModal.addProductDetails.EntityDTO.Image} className="img-fluid rounded" alt="" />
						</div>
					</div>
				</div>
				<div className="col-12 mt-2">
					<h5 for="note">Amount</h5>
					<input type="number" className="col-sm-3" id="quantity" min="1" value={productCount} onChange={(e) => setProductCount(e.target.value)} />x
					<span style={{ color: "#198ae3" }}>{Number(orderState.orderDetailsModal.addProductDetails.EntityDTO.Price).toFixed(2)} RSD</span>
				</div>
				<div className="col-12 mt-2">
					<MultiSelectListItems
						list={orderState.orderDetailsModal.addProductDetails.EntityDTO.SideDishes}
						selectedItems={selectedSideDishes}
						handleItemDelete={handleSideDishDelete}
						handleItemAdd={handleAddSideDish}
						handleItemsAddAll={handleItemsAddAll}
						itemsName="side dishes"
						hiddenSelectAll={false}
					/>
				</div>
				<div className="col-12 mt-2">
					<h5 for="note">Note</h5>
					<textarea className="form-control" id="note" rows="3" placeholder="Note..." onChange={(e) => setNote(e.target.value)}></textarea>
				</div>
                <div className="col-12 portfolio-item">
                    <button
                            type="button"
                            className="btn btn-primary border-0 mt-2 float-right"
                            style={{ backgroundColor: colorConstants.COLOR_BLUE }}
                            onClick={handleAddItem}>
                        Add
                    </button>
                </div>
                
                
        </React.Fragment>
	);
};

export default AddProductItemDetailsModelView;
