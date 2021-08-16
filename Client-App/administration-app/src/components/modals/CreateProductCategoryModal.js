import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../constants/ModalConstants";
import { productConstants } from "../../constants/ProductConstants";
import { ProductContext } from "../../contexts/ProductContext";
import { productService } from "../../services/ProductService";
import FailureAlert from "../messages/FailureAlert";

const CreateProductCategoryModal = () => {
	const { productState, dispatch } = useContext(ProductContext);

	const [categoryName, setCategoryName] = useState("");

	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_CREATE_CATEGORY_MODAL });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		productService.createProductCategory(categoryName, dispatch);
	};

	return (
		<Modal show={productState.createCategory.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Create product category</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<FailureAlert
					hidden={!productState.createCategory.showErrorMessage}
					header="Error"
					message={productState.createCategory.errorMessage}
					handleCloseAlert={() => dispatch({ type: productConstants.CATEGORY_CREATE_REQUEST })}
				/>
				<form className="forms-sample" method="post" onSubmit={handleSubmit}>
					<div className="form-group">
						<label for="restaurantName">Category name</label>
						<input type="text" required className="form-control" id="categoryName" placeholder="Category name" onChange={(e) => setCategoryName(e.target.value)} />
					</div>
					<button type="submit" className="btn btn-primary mr-2">
						Submit
					</button>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleModalClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateProductCategoryModal;
