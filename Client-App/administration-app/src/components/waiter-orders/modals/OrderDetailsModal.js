import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../../constants/ModalConstants";
import { OrderContext } from "../../../contexts/OrderContext";
import { orderService } from "../../../services/OrderService";
import OrderDetailsInformationSideBar from "./OrderDetailsInformationSideBar";

const OrderDetailsModal = () => {
	const { orderState , dispatch } = useContext(OrderContext);
    const [ modalStyle, setModalStyle] = useState("details-modal-size");

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_ORDER_DETAILS_MODAL });
	};

	const handleAddProducts = () => {
		setModalStyle("add-products-details-modal-size")
	}

	useEffect(() => {
		const getOrderDetails = async (id) => {
			await orderService.getOrderDetails(id,dispatch);
		};

		if(orderState.orderDetails.orderId !== '' && orderState.orderDetails.orderId !== null){
			getOrderDetails(orderState.orderDetails.orderId);
		}
	}, [orderState.orderDetails.orderId,dispatch]);

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
						<div className="col-6">
							<OrderDetailsInformationSideBar 
								orderType='DELIVERY'
								address='Bulevar despota Stefana 7a, Novi Sad, stan 3'
								table='13'
								createdDate='test'
								estimatedDate='test2'
								price='1300'/>
							<Button onClick = {handleAddProducts}>Add products</Button>
						</div>
						<div className="col-6">
							Test1
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
