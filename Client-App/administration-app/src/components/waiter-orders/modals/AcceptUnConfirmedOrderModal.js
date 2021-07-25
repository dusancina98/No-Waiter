import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { modalConstants } from "../../../constants/ModalConstants";
import { orderConstants } from "../../../constants/OrderConstants";
import { OrderContext } from "../../../contexts/OrderContext";
import { colorConstants } from "../../../constants/ColorConstants";
import FailureAlert from "../../FailureAlert";
import { orderService } from "../../../services/OrderService";

const AcceptUnConfirmedOrderModal = ({orderId}) => {
	const { orderState,dispatch } = useContext(OrderContext);
    const [ estimatedTime, setEstimatedTime] = useState("");


	const handleModalClose = () => {
		dispatch({ type: modalConstants.HIDE_ACCEPT_UNCONFIRMED_ORDER_MODAL });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        if(estimatedTime<=0){
            dispatch({ type: orderConstants.ACCEPT_UNCONFIRMED_ORDER_ESTIMATED_TIME_FAILURE, errorMessage: 'Number must be positive and more than 0' });
        }else{
			let acceptOrderDTO = {
				OrderId: orderId,
				EstimatedTime: estimatedTime,
			};
			orderService.acceptUnConfirmedOrder(acceptOrderDTO, dispatch);
		}
	};

	return (
		<Modal show={orderState.acceptUnConfirmedOrder.showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<h3>Accept unconfirmed order</h3>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<FailureAlert
					hidden={!orderState.acceptUnConfirmedOrder.showErrorMessage}
					header="Error"
					message={orderState.acceptUnConfirmedOrder.errorMessage}
					handleCloseAlert={() => dispatch({ type: orderConstants.ACCEPT_UNCONFIRMED_ORDER_REQUEST })}
				/>

				<div className="row">
					<div className="col-md-12 grid-margin stretch-card">
						<div className="card" style={{ border: "0" }}>
							<div className="card-body">
                                <form className="forms-sample" method="put" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label for="estimatedTime">Estimated time</label>
                                        <input type="number" required value={estimatedTime} className="form-control" id="estimatedTime" placeholder="Estimated time" onChange={(e) => setEstimatedTime(e.target.value)} />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success mt-2"
                                        style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}
                                    >
                                        Accept
                                    </button>
                                </form>
							</div>
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

export default AcceptUnConfirmedOrderModal;
