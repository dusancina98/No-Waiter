import React, { useContext } from "react";
import { colorConstants } from "../../constants/ColorConstants";
import { orderConstants } from "../../constants/OrderConstants";
import { OrderContext } from "../../contexts/OrderContext";
import OrderItemList from "./OrderItemList";

const CreateOrderSidebar = ({ address, estimatedTime }) => {
	const { orderState, dispatch } = useContext(OrderContext);

	const getOrderSum = () => {
		let sum = 0;
		orderState.createOrder.items.forEach((item) => {
			sum += item.count * item.price;
		});
		return sum;
	};

	const handleSelectOrderType = () => {
		if (orderState.createOrder.pageVisible === 4) {
			dispatch({ type: orderConstants.SET_ADDRESS_AND_TIME_CREATE_ORDER, delivery: { address, estimatedTime }, page: 6 });
		} else {
			dispatch({ type: orderConstants.SET_CREATE_ORDER_PAGE, page: 2 });
		}
	};

	const handleBackToPrevious = () => {
		dispatch({
			type: orderConstants.SET_CREATE_ORDER_PAGE,
			page: orderState.createOrder.pageVisible === 6 || orderState.createOrder.pageVisible === 4 ? 2 : orderState.createOrder.pageVisible - 1,
		});
	};
	// createOrder:
	// items: Array(1)
	// 0:
	// count: 1
	// id: "ab7ca188-5743-407c-9b5d-cb8a0834b62f"
	// imagePath: "./product-api/api/products/product-images//f59d1eef-f752-4152-adb1-78d2ff6fb656.jpg"
	// name: "Burger XXXL"
	// note: ""
	// price: 1233
	// productId: "f59d1eef-f752-4152-adb1-78d2ff6fb656"
	// sideDishes: Array(2)
	// 0:
	// EntityDTO: {Name: "Pomfrit"}
	// Id: "3ceb3860-0a1c-455a-82c0-36b5775672ff"
	// __proto__: Object
	// 1: {Id: "88a63655-bb3c-4ec6-872d-54153a86ec1d", EntityDTO: {…}}
	// length: 2
	const handleSubmitOrder = () => {
		console.log(orderState);
		let order = {
			Items: [],
			OrderType: orderState.orderType,
			Address: orderState.deliveryInfo.address,
			EstimatedTime: orderState.deliveryInfo.estimatedTime,
			TableId: orderState.selectedTable.id,
		};

		orderState.createOrder.items.forEach((item) => {
			if (item.sideDishes.length === 0) {
				order.Items.push({ Id: item.id, Count: item.count, SideDishes: [] });
			} else {
				let sideDishes = [];
				item.sideDishes.forEach((sideDish) => {
					sideDishes.push(sideDish.Id);
				});
				order.Items.push({ Id: item.id, Count: item.count, SideDishes: sideDishes });
			}
		});

		console.log(order);
	};

	return (
		<div className={orderState.createOrder.pageVisible === 6 ? "col-md-6 col-lg-6 col-12" : "col-md-4 col-lg-4 col-12"}>
			<h3 className="ml-2 mb-3">Order items</h3>

			<OrderItemList />
			<div className="row d-flex justify-content-end">
				<div className="mr-3">
					<b>Total:</b>
					<span style={{ color: "#198ae3" }} className="ml-2">
						<b>{Number(getOrderSum()).toFixed(2)} RSD</b>
					</span>
				</div>
			</div>
			<div className={orderState.selectedTable.number === "" ? "" : "row mt-4 d-flex justify-content-end"} hidden={orderState.selectedTable.number === ""}>
				<div className="mr-3">
					<h4>
						Selected table:
						<span className="ml-2" style={{ color: "#198ae3" }}>
							Table {orderState.selectedTable.number}
						</span>
					</h4>
				</div>
			</div>
			<div className={orderState.deliveryInfo.address === "" ? "" : "row mt-4 "} hidden={orderState.deliveryInfo.address === ""}>
				<div className="ml-4">
					<h4>
						Delivery address:
						<span className="ml-2">{orderState.deliveryInfo.address}</span>
					</h4>
					<h4>
						Estimated time:
						<span className="ml-2">{orderState.deliveryInfo.estimatedTime} min</span>
					</h4>
				</div>
			</div>
			<div className={orderState.createOrder.pageVisible === 1 ? "row mt-4 mr-1 d-flex justify-content-end" : "row mt-4 mr-1 d-flex justify-content-between"}>
				<button
					type="button"
					hidden={orderState.createOrder.pageVisible === 1}
					className="btn btn-primary border-0 ml-4"
					style={{ backgroundColor: colorConstants.COLOR_BLUE }}
					onClick={handleBackToPrevious}
				>
					Back
				</button>
				<button
					type="button"
					hidden={orderState.createOrder.pageVisible === 6}
					disabled={orderState.createOrder.pageVisible === 2}
					className="btn btn-primary border-0"
					style={{ backgroundColor: colorConstants.COLOR_BLUE }}
					onClick={handleSelectOrderType}
				>
					Next
				</button>
				<button
					type="button"
					hidden={orderState.createOrder.pageVisible !== 6}
					className="btn btn-primary border-0"
					style={{ backgroundColor: colorConstants.COLOR_BLUE }}
					onClick={handleSubmitOrder}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default CreateOrderSidebar;
