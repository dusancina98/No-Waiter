import React, { useContext } from 'react'
import moment from 'moment';
import { OrderContext } from '../../contexts/OrderContext';
import { orderService } from "../../services/OrderService"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const OnRouteOrderItem = ({ order }) => {
	const { dispatch } = useContext(OrderContext);

    const rejectOrder = (orderId) => {
        confirmAlert({
			message: 'Are you sure to do this?',
			buttons: [
			  {
				label: 'Yes',
				onClick: () => orderService.rejectOrder(orderId, dispatch)
			  },
			  {
				label: 'No',
			  }
			]
		  });
    }

    const setOrderToCompleted = (orderId) => {
        confirmAlert({
			message: 'Are you sure to do this?',
			buttons: [
			  {
				label: 'Yes',
				onClick: () => orderService.setOrderToCompleted(orderId, dispatch)
			  },
			  {
				label: 'No',
			  }
			]
		  });
    }


	return (
        <div className="hover-div">
            <li className="list-group-item hover-div" style= {{"width":"auto","minHeight":"100px","minWidth":"250px"}}>
                <div className="hover-div--off">
                    <div className="row align-items-center" >
                        <div className="col-2 ">
                            <div className="row">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
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
                            <div className="row">
                                    <b>Deliverer</b>: {order.Deliverer}
                            </div>
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
                            <button style={{"minHeight":"100px"}} onClick={()=>rejectOrder(order.OrderId)}>
                                Reject
                            </button>
                        </div>
                        <div className="col-4 text-center">
                            <button style={{"minHeight":"100px"}}>
                                Details
                            </button>
                        </div>
                        <div className="col-4 text-center">
                            <button style={{"minHeight":"100px"}} onClick={()=>setOrderToCompleted(order.OrderId)}>
                                Complete
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

export default OnRouteOrderItem;
