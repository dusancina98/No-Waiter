import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { ProductContext } from "../../contexts/ProductContext";
import { productService } from "../../services/ProductService";
import CreateProductForm from "../CreateProductForm";

const CreateProductModal = () => {
	const { productState, dispatch } = useContext(ProductContext);

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_CREATE_CATEGORY_MODAL });
	};

	return (
		<Modal show={productState.createProduct.showModal} size="xl" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Create product</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CreateProductForm />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleModalClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateProductModal;
