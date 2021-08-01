import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../../constants/ModalConstants";
import { orderConstants } from "../../../constants/OrderConstants";
import { OrderContext } from "../../../contexts/OrderContext";
import ProductContextProvider from "../../../contexts/ProductContext";
import { orderService } from "../../../services/OrderService";
import ModifyOrderProductList from "../ModifyOrderProductList";
import AddProductItemDetailsModelView from "./AddProductItemDetailsModelView";
import OrderDetailsInformationSideBar from "./OrderDetailsInformationSideBar";
import OrderItemsHeaderModalView from "./OrderItemsHeaderModalView";
import OrderItemsListSideBarModalView from "./OrderItemsListSideBarModalView";

const OrderDetailsModal = () => {
	const { orderState , dispatch } = useContext(OrderContext);
    const [ modalStyle, setModalStyle] = useState("details-modal-size");
    const [ leftSideColSize ] = useState("col-7");
    const [ rightSideColSize ] = useState("col-5");

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_ORDER_DETAILS_MODAL });
		setModalStyle("details-modal-size")
	};

	const handleAddOrderItem = () => {
		dispatch({ type: orderConstants.WAITER_MODIFY_ORDER_SHOW_ADD_PRODUCT });
	}

	useEffect(() => {
		const getOrderDetails = async (id) => {
			await orderService.getOrderDetails(id,dispatch);
		};

		if(orderState.orderDetailsModal.orderId !== '' && orderState.orderDetailsModal.orderId !== null){
			getOrderDetails(orderState.orderDetailsModal.orderId);
		}
	}, [orderState.orderDetailsModal.orderId,dispatch]);

	const setProductCount = (id,count) => {
		dispatch({ type: orderConstants.SET_PRODUCT_COUNT_TO_ORDER_FROM_ORDER_DETAILS, id, count });
	}

	const deleteFromShoppingCart = (id) => {
		if(orderState.orderDetailsModal.order.OrderItems.length !== 1){
			dispatch({ type: orderConstants.REMOVE_PRODUCT_FROM_ORDER_FROM_ORDER_DETAILS, id });
		}
		//TODO: printati error da ne moze da ostane order bez itema
	}

	const handleClickBack = () =>{
		dispatch({ type: orderConstants.WAITER_MODIFY_ORDER_HIDE_ADD_PRODUCT });
	}

	const getOrderSum = () => {
		let sum = 0;
		if(orderState.orderDetailsModal.order.OrderItems !== undefined){
			orderState.orderDetailsModal.order.OrderItems.forEach((item) => {
				sum += item.Count * item.Price;
			});
		}
		return sum;
	};

	return ( 
		<Modal dialogClassName={modalStyle} show={orderState.orderDetailsModal.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<h3>Order details</h3>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
                <div>
					<div className="row">
						<div className={leftSideColSize} >
							{orderState.orderDetailsModal.showAddProduct ? 
								<ProductContextProvider>
									{orderState.orderDetailsModal.showAddProductDetails ? 
										<AddProductItemDetailsModelView
											/>
										:
										<ModifyOrderProductList 
											handleClickBack={handleClickBack}/>
									}
								</ProductContextProvider>
								:
								<OrderDetailsInformationSideBar 
									orderType={orderState.orderDetailsModal.order.OrderType}
									address={orderState.orderDetailsModal.order.Address}
									table={orderState.orderDetailsModal.order.Table}
									createdDate={orderState.orderDetailsModal.order.CreatedTime}
									estimatedDate={orderState.orderDetailsModal.order.EstimatedTime}
									price={Number(getOrderSum()).toFixed(2)}/>
							}
						</div>
						<div className={rightSideColSize}>
							<OrderItemsHeaderModalView 
								handleAddOrderItem ={handleAddOrderItem}/>
							<OrderItemsListSideBarModalView
								setProductCount= {setProductCount}
								deleteFromShoppingCart= {deleteFromShoppingCart}
							/>

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
