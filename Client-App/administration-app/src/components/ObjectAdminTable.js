import ObjectAdminList from "./ObjectAdminList";

const ObjectAdminTable = () => {
	return (
		<div className="col-lg-12 grid-margin stretch-card">
			<div className="card">
				<div className="card-body">
					<h4 className="card-title">Object admins</h4>
					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>Email</th>
									<th>Name</th>
									<th>Surname</th>
									<th>Address</th>
									<th>Object name</th>
								</tr>
							</thead>
							<tbody>
								<ObjectAdminList />
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ObjectAdminTable;
