import React, { useContext } from 'react'
import moment from 'moment';
import { OrderContext } from '../../contexts/OrderContext';
import { orderService } from "../../services/OrderService"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { modalConstants } from '../../constants/ModalConstants';

const ConfirmedOrderItem = ({ order, notifyManager }) => {
	const { dispatch } = useContext(OrderContext);

    const rejectOrder = (orderId) => {

        confirmAlert({
			message: 'Are you sure to do this?',
			buttons: [
			  {
				label: 'Yes',
				onClick: () => orderService.rejectOrder(orderId, dispatch, notifyManager)
			  },
			  {
				label: 'No',
			  }
			]
		  });
    }

    const readyOdrer = (orderId) =>{
        confirmAlert({
			message: 'Are you sure to do this?',
			buttons: [
			  {
				label: 'Yes',
				onClick: () => orderService.readyOrder(orderId, dispatch,notifyManager)
			  },
			  {
				label: 'No',
			  }
			]
		  });
    }

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
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
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
                            <div className="row">
                                <b>Expired</b>: {moment.utc(order.ExpiredTimeStamp).local().startOf('seconds').fromNow()}
                            </div>
                            {order.OrderType==="DELIVERY" ? 
                            <div></div>:
                            <div className="row">
                                <b>Table</b>:  {order.Table}
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
                        <div className="col-4 text-center">
                            <button style={{"minHeight":"75px"}} onClick={()=>rejectOrder(order.OrderId)}>
                                Reject
                            </button>
                        </div>
                        <div className="col-4 text-center">
                            <button style={{"minHeight":"75px"}} onClick={()=>orderDetails(order.OrderId)}>
                                Details
                            </button>
                        </div>
                        <div className="col-4 text-center">
                            <button style={{"minHeight":"75px"}} onClick={()=>readyOdrer(order.OrderId)}>
                                Ready
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

export default ConfirmedOrderItem;
