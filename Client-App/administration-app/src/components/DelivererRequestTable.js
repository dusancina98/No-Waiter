import React from "react";
import DelivererRequestList from "./DelivererRequestList";

const DelivererRequestTable = () => {
	return (
		<React.Fragment>
			<div className="col-lg-12 grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Deliverer requests</h4>
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th>Email</th>
										<th>Name</th>
										<th>Surname</th>
										<th>Phone number</th>
									</tr>
								</thead>
								<tbody>
									<DelivererRequestList></DelivererRequestList>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DelivererRequestTable;
