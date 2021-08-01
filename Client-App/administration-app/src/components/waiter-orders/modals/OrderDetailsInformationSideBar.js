import React, {useState, useContext} from 'react'
import moment from 'moment';
import { colorConstants } from '../../../constants/ColorConstants';
import { OrderContext } from '../../../contexts/OrderContext';
import { orderConstants } from '../../../constants/OrderConstants';

const OrderDetailsInformationSideBar = ({ orderType, address, table, createdDate, estimatedDate, price,enableSaveButton }) => {
	const { dispatch } = useContext(OrderContext);

	const [editButtonDisabled, setEditButtonDisabled] = useState(true)
	const [editableAddress, setEditableAddress] = useState(false);
	const [editableOrderType, setEditableOrderType] = useState(false);
	const [editedAddress, setEditedAddress] = useState('');
	const [editedOrderType, setEditedOrderType] = useState('');
	const [editedTable] = useState('');

	const handleSetAddress = (value) =>{
		setEditedAddress(value)
		setEditableAddress(true)
		setEditButtonDisabled(false)
	}

	const handleSetOrderType = (e) =>{
		setEditedOrderType(e.target.value)
		setEditableOrderType(true)
		setEditButtonDisabled(false)
	}

	const handleEdit = () => {
		setEditButtonDisabled(true)
		enableSaveButton()
		dispatch({type: orderConstants.EDIT_ORDER_INFROMATION_BY_WAITER, address: editedAddress, table:editedTable, orderType:editedOrderType})
	}

	return (
        <React.Fragment>
			<form  onSubmit={handleEdit}>
				<div>
					Order type: 
					<select className="form-control mt-2" value={editableOrderType === true ? editedOrderType : orderType} onChange={(e)=>handleSetOrderType(e)}>
						<option value='TAKEOVER'>TAKE OVER</option>
						<option value='DELIVERY'>DELIVERY</option>
						<option value='ORDER_INSIDE'>DINE IN</option>
					</select>
				</div>
				{ orderType==='DELIVERY' && (editedOrderType==='DELIVERY' || editedOrderType==='')? 
					<div className="mt-2">
						Address:
						<input 
							type="text"
							required
							className="form-control mt-2"
							id="address"
							value={editableAddress === true ? editedAddress : address}
							placeholder="Address"
							onChange={(e) => handleSetAddress(e.target.value)}
						/>	
					</div>:
					<div className="mt-2">
						Table: <b>{table}</b>
					</div>  
				}
				<div className="mt-2">
					Created date: <b>{moment.utc(createdDate).local().startOf('seconds').fromNow()}</b>
				</div>
				<div className="mt-2">
					Estimated date: <b>{moment.utc(estimatedDate).local().startOf('seconds').fromNow()}</b>
				</div>
				<div className="mt-2">
					Price: <b>{price} RSD</b>
				</div>
				<button
					type='submit'
					disabled={editButtonDisabled}
					className="btn btn-success mt-3"
					style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}
					>
					Edit
				</button>
			</form>
        </React.Fragment>
	);
};

export default OrderDetailsInformationSideBar;
