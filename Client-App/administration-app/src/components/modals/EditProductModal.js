import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { productConstants } from "../../constants/ProductConstants";
import { ProductContext } from "../../contexts/ProductContext";
import EditIngredientsAndSideDishesForm from "../objectadmin-objectdetails/EditIngredientsAndSideDishesForm";
import EditProductForm from "../objectadmin-objectdetails/EditProductForm";
import FailureAlert from "../messages/FailureAlert";

const EditProductModal = () => {
	const { productState, dispatch } = useContext(ProductContext);

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_UPDATE_PRODUCT_MODAL });
	};

	return (
		<Modal show={productState.updateProduct.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Edit product</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<FailureAlert
					hidden={!productState.updateProduct.showErrorMessage}
					header="Error"
					message={productState.updateProduct.errorMessage}
					handleCloseAlert={() => dispatch({ type: productConstants.UPDATE_PRODUCT_MODAL_HIDE_ERROR })}
				/>
				<EditProductForm hidden={productState.updateProduct.showedPage !== 1} />
				<EditIngredientsAndSideDishesForm hidden={productState.updateProduct.showedPage !== 2} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleModalClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditProductModal;
