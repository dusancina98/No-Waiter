import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { colorConstants } from "../../constants/ColorConstants";
import { modalConstants } from "../../constants/ModalConstants";
import { orderConstants } from "../../constants/OrderConstants";
import { OrderContext } from "../../contexts/OrderContext";
import { v4 as uuidv4 } from "uuid";
import { capitalizeFirstLetter } from "../../helpers/string-util";
import MultiSelectListItems from "../MultiSelectListItems";

const CreateOrderItemDetailsModal = () => {
	const { orderState, dispatch } = useContext(OrderContext);

	const [selectedSideDishes, setSelectedSideDishes] = useState([]);
	const [note, setNote] = useState("");
	const [productCount, setProductCount] = useState(1);

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_ORDER_ITEM_DETAILS_MODAL });

		setProductCount(1);
		setNote("");
		setSelectedSideDishes([]);
	};

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
		dispatch({
			type: orderConstants.ADD_PRODUCT_TO_ORDER,
			item: {
				id: uuidv4(),
				productId: orderState.orderItemDetails.selectedProduct.Id,
				imagePath: orderState.orderItemDetails.selectedProduct.EntityDTO.Image,
				name: orderState.orderItemDetails.selectedProduct.EntityDTO.Name,
				price: orderState.orderItemDetails.selectedProduct.EntityDTO.Price,
				sideDishes: selectedSideDishes,
				count: productCount,
				note: note,
			},
		});

		setProductCount(1);
		setNote("");
		setSelectedSideDishes([]);
	};

	console.log(orderState.orderItemDetails);
	return (
		<Modal show={orderState.orderItemDetails.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Select side dishes and add note</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="col-12 portfolio-item">
					<div className="row" style={{ cursor: "pointer" }}>
						<div className="col-7 col-md-8">
							<h3>{orderState.orderItemDetails.selectedProduct.EntityDTO.Name}</h3>

							<p>
								{orderState.orderItemDetails.selectedProduct.EntityDTO.Ingredients.map((ingredient) =>
									orderState.orderItemDetails.selectedProduct.EntityDTO.Ingredients.indexOf(ingredient) ===
									orderState.orderItemDetails.selectedProduct.EntityDTO.Ingredients.length - 1
										? capitalizeFirstLetter(ingredient.EntityDTO.Name)
										: capitalizeFirstLetter(ingredient.EntityDTO.Name + ", ")
								)}
							</p>

							<p>
								{orderState.orderItemDetails.selectedProduct.EntityDTO.Amount} x {orderState.orderItemDetails.selectedProduct.EntityDTO.MeasureUnit}
							</p>

							<h4 style={{ color: colorConstants.COLOR_BLUE }}>RSD {Number(orderState.orderItemDetails.selectedProduct.EntityDTO.Price).toFixed(2)}</h4>
						</div>
						<div className="col-5 col-md-4">
							<img src={orderState.orderItemDetails.selectedProduct.EntityDTO.Image} className="img-fluid rounded" alt="" />
						</div>
					</div>
				</div>
				<div className="col-12 mt-2">
					<h5 for="note">Amount</h5>
					<input type="number" className="col-sm-3" id="quantity" min="1" value={productCount} onChange={(e) => setProductCount(e.target.value)} />x
					<span style={{ color: "#198ae3" }}>{Number(orderState.orderItemDetails.selectedProduct.EntityDTO.Price).toFixed(2)} RSD</span>
				</div>
				<div className="col-12 mt-2">
					<MultiSelectListItems
						list={orderState.orderItemDetails.selectedProduct.EntityDTO.SideDishes}
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
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleAddItem}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateOrderItemDetailsModal;
