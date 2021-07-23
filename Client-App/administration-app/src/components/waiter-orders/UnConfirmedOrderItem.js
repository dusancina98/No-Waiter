import React, {useContext} from 'react'
import moment from 'moment';
import { OrderContext } from '../../contexts/OrderContext';
import { orderService } from "../../services/OrderService"

const UnConfirmedOrderItem = ({ order }) => {
	const { dispatch } = useContext(OrderContext);

    const rejectOrder = (orderId) => {
        orderService.rejectOrder(orderId, dispatch)
    }

	return (
        <div className="hover-div">
            <li className="list-group-item hover-div--off" style= {{"width":"auto","minHeight":"100px","minWidth":"250px"}}>
                <div>
                    <div className="row align-items-center" >
                        <div className="col-2 ">
                            <div className="row">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="col-7" >
                            <div className="row">
                                <b>Type</b>: {order.OrderType}
                            </div> 
                            <div className="row">
                                <b>Placed</b>: {moment.utc(order.TimeStamp).local().startOf('seconds').fromNow()}
                            </div>
                            <div className="row">
                                <b>Table</b>:  {order.Table}
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
            </li>
                    
            <li className='hover-div--on'>
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
                            <button style={{"minHeight":"100px"}} >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </div>
	);
};

export default UnConfirmedOrderItem;
