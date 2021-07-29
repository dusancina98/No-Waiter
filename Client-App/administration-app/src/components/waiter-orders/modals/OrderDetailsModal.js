import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../../constants/ModalConstants";
import { orderConstants } from "../../../constants/OrderConstants";
import { OrderContext } from "../../../contexts/OrderContext";
import { hasRoles } from "../../../helpers/auth-header";
import { orderService } from "../../../services/OrderService";
import OrderItem from "../../create-orders/OrderItem";
import OrderDetailsInformationSideBar from "./OrderDetailsInformationSideBar";

const OrderDetailsModal = () => {
	const { orderState , dispatch } = useContext(OrderContext);
    const [ modalStyle, setModalStyle] = useState("details-modal-size");
    const [ leftSideColSize, setLeftSideColSize] = useState("col-5");
    const [ rightSideColSize, setRightSideColSize] = useState("col-7");

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_ORDER_DETAILS_MODAL });
		setModalStyle("details-modal-size")
		setLeftSideColSize("col-5")
		setRightSideColSize("col-7")
	};

	const handleAddOrderItem = () => {
		setModalStyle("add-products-details-modal-size")
		setLeftSideColSize("col-8")
		setRightSideColSize("col-4")

	}

	useEffect(() => {
		const getOrderDetails = async (id) => {
			await orderService.getOrderDetails(id,dispatch);
		};

		if(orderState.orderDetails.orderId !== '' && orderState.orderDetails.orderId !== null){
			getOrderDetails(orderState.orderDetails.orderId);
		}
	}, [orderState.orderDetails.orderId,dispatch]);

	const setProductCount = () => {
		//dispatch({ type: orderConstants.SET_PRODUCT_COUNT_TO_ORDER, id, count });
	}

	const deleteFromShoppingCart = (id) => {
		if(orderState.orderDetails.order.OrderItems.length !== 1){
			dispatch({ type: orderConstants.REMOVE_PRODUCT_FROM_ORDER_FROM_ORDER_DETAILS, id });
		}
		//TODO: printati error da ne moze da ostane order bez itema
	}

	return ( 
		<Modal dialogClassName={modalStyle} show={orderState.orderDetails.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<h3>Order details</h3>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
                <div>
					<div className="row">
						<div className={leftSideColSize}>
							<OrderDetailsInformationSideBar 
								orderType={orderState.orderDetails.order.OrderType}
								address={orderState.orderDetails.order.Address}
								table={orderState.orderDetails.order.Table}
								createdDate={orderState.orderDetails.order.CreatedTime}
								estimatedDate={orderState.orderDetails.order.EstimatedTime}
								price={orderState.orderDetails.order.Price}/>
						</div>
						<div className={rightSideColSize}>
							<div className="row">
								<h3 className="mt-1">Order items</h3>
								<button
								type="button"
								data-toggle="tooltip"
								disabled={!hasRoles("ROLE_WAITER")}
								hidden={!hasRoles("ROLE_WAITER")}
								title="Add new item"
								className="btn btn-outline-secondary btn-rounded btn-icon border-0 mt"
								onClick = {handleAddOrderItem}
								>	
									<i class="mdi mdi-plus text-dark"></i>
								</button>
							</div>

						
							{orderState.orderDetails.order.OrderItems !== undefined ?
							<div>
								{orderState.orderDetails.order.OrderItems.map((item) => {
									console.log(item);
								return (
									<React.Fragment>
										<OrderItem
											id={item.Id}
											key={item.Id}
											name={item.Name}
											count={item.Count}
											price={item.Price}
											sideDishes={item.SideDishes}
											imageUrl={item.ImageUrl}
											setProductCount={setProductCount}
											deleteFromShoppingCart={deleteFromShoppingCart}
										/>
										<hr />
									</React.Fragment>
								);
							})}
							<div className="row d-flex justify-content-end">
								<div className="mr-3">
									<b>Total:</b>
									<span style={{ color: "#198ae3" }} className="ml-2">
										<b>{Number(orderState.orderDetails.order.Price)} RSD</b>
									</span>
								</div>
							</div>
							</div>:
							<div>
								Order items not found
							</div>
							}
						
						</div>
					</div>
                </div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleModalClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default OrderDetailsModal;
