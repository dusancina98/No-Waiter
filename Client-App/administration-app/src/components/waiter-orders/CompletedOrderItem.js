import React, { useContext } from 'react'
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { modalConstants } from '../../constants/ModalConstants';
import { OrderContext } from '../../contexts/OrderContext';

const CompletedOrderItem = ({ order }) => {
	const { dispatch } = useContext(OrderContext);

    const orderDetails = (orderId) => {
        dispatch({type: modalConstants.SHOW_ORDER_DETAILS_MODAL, orderId})
    }

	return (
        <div className="hover-div">
            <li className="list-group-item hover-div" style= {{"width":"auto","minHeight":"100px","minWidth":"250px"}}>
                <div className="hover-div--off">
                    <div className="row align-items-center" >
                        <div className="col-2 ">
                            <div className="row">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="col-7" >
                            <div className="row">
                                <b>Type</b>: {order.OrderType}
                            </div> 
                            <div className="row">
                                <b>Placed</b>: {moment.utc(order.CreatedTimeStamp).local().startOf('seconds').fromNow()}
                            </div>
                            {order.OrderType==="DELIVERY" ? 
                            <div className="row">
                                <b>Deliverer</b>: {order.Deliverer}
                            </div>:
                            <div className="row">
                                <b>Table</b>: {order.Table}
                            </div>
                            }
                        </div>
                        <div className="col-3" >
                            <div className="row">
                                Price:
                            </div> 
                            <div className="row">
                                <b>{order.Price}</b>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className='hover-div--on'>
                <div >
                    <div className="row">
                        <div className="col-12 text-center">
                            <button style={{"minHeight":"75px"}} onClick={()=>orderDetails(order.OrderId)}>
                                Details
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </li>
            <span></span>
                    
 
        </div>
	);
};

export default CompletedOrderItem;
