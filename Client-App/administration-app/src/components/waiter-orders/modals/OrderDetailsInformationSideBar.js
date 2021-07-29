import React from 'react'
import moment from 'moment';

const OrderDetailsInformationSideBar = ({ orderType, address, table, createdDate, estimatedDate, price }) => {
	return (
        <React.Fragment>
            <div>
			    Order type: <b>{orderType}</b>
			</div>
            { orderType==='DELIVERY' ? 
                <div className="mt-2">
                    Address: <b>{address}</b>
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
        </React.Fragment>
	);
};

export default OrderDetailsInformationSideBar;
