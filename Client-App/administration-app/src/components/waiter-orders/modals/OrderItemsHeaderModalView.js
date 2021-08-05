import React from 'react'
import { hasRoles } from '../../../helpers/auth-header';

const OrderItemsHeaderModalView = ({handleAddOrderItem}) => {
	return (
        <React.Fragment>
            <div className="row">
				<h3 className="mt-1">Order items</h3>
				<button
					type="button"
					data-toggle="tooltip"
					disabled={!hasRoles("ROLE_WAITER")}
					hidden={!hasRoles("ROLE_WAITER")}
					title="Add new item"
					className="btn btn-outline-secondary btn-rounded btn-icon border-0 mt"
					onClick = {() => handleAddOrderItem()}>	
						<i class="mdi mdi-plus text-dark"></i>
				</button>
			</div>
        </React.Fragment>
	);
};

export default OrderItemsHeaderModalView;
