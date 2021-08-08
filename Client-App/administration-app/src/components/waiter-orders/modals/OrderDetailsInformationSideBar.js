import React, {useState, useContext, useEffect} from 'react'
import moment from 'moment';
import { colorConstants } from '../../../constants/ColorConstants';
import { OrderContext } from '../../../contexts/OrderContext';
import { orderConstants } from '../../../constants/OrderConstants';
import { TableContext } from '../../../contexts/TableContext';
import { tableService } from '../../../services/TableService';

const OrderDetailsInformationSideBar = ({ orderType, address, table, createdDate, estimatedDate, price, enableSaveButton, orderStatus }) => {
	const  ordCtx = useContext(OrderContext);
	const { tableState, dispatch } = useContext(TableContext);

	const [editButtonDisabled, setEditButtonDisabled] = useState(true)
	const [editableAddress, setEditableAddress] = useState(false);
	const [editableOrderType, setEditableOrderType] = useState(false);
	const [editedAddress, setEditedAddress] = useState('');
	const [editedOrderType, setEditedOrderType] = useState('');
	const [editedTableId, setEditedTableId] = useState('');
	const [editableTable, setEditableTable] = useState(false);

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

	const handleSetTable = (e) =>{
		setEditedTableId(e.target.value)
		setEditableTable(true)
		setEditButtonDisabled(false)
	}

	const handleEdit = () => {
		setEditButtonDisabled(true)
		enableSaveButton()
		let tableDto ={
			Id: editedTableId,
			Number: 1
		}
		ordCtx.dispatch({type: orderConstants.EDIT_ORDER_INFROMATION_BY_WAITER, address: editedAddress, table:tableDto, orderType:editedOrderType})
	}

	useEffect(() => {
		const getObjectsHandler = async () => {
			await tableService.findAll(dispatch);
		};
		getObjectsHandler();
	},[dispatch]);

	return (
        <React.Fragment>
			<form  onSubmit={handleEdit}>
				<div className="row ml-1 mr-1">
					Order type: 
					<select hidden={orderStatus!=='CONFIRMED' && orderStatus!=='UNCONFIRMED'} className="form-control mt-2" value={editableOrderType === true ? editedOrderType : orderType} onChange={(e)=>handleSetOrderType(e)}>
						<option value='TAKEOVER'>TAKE OVER</option>
						<option value='DELIVERY'>DELIVERY</option>
						<option value='ORDER_INSIDE'>DINE IN</option>
					</select>
					<div className="ml-2" hidden={orderStatus==='CONFIRMED' || orderStatus==='UNCONFIRMED'}>
						{orderType}
					</div>
				</div>
				{ (orderType==='DELIVERY' && editedOrderType==='') || editedOrderType==='DELIVERY'? 
					<div className="row mt-2 ml-1 mr-1">
						Address:
						<input 
							hidden={orderStatus!=='CONFIRMED' && orderStatus!=='UNCONFIRMED'}
							type="text"
							required
							className="form-control mt-2"
							id="address"
							value={editableAddress === true ? editedAddress : address}
							placeholder="Address"
							onChange={(e) => handleSetAddress(e.target.value)}
						/>	
						<div  className="ml-2" hidden={orderStatus==='CONFIRMED' || orderStatus==='UNCONFIRMED'}>
							{address}
						</div>

					</div>:
					{ ...orderType==='ORDER_INSIDE' || editedOrderType==='ORDER_INSIDE' ? 

						{...editedOrderType==="TAKEOVER" ? 
						<div>

						</div>:
						<div className="mt-2">
							Table:
							<select className="form-control mt-2" value={editableTable === true ? editedTableId : table.Id} onChange={(e)=>handleSetTable(e)}>

								{tableState.tables.map((item) => {
									return (
									<option value={item.Id}>{item.EntityDTO.Number}</option>)
								})}
							</select>
						</div>	
					}:
					<div>
		
					</div>
					}
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
					hidden={orderStatus!=='CONFIRMED' && orderStatus!=='UNCONFIRMED'}
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
