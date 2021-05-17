const TableItem = ({ deleteHandler, number }) => {
	return (
		<div className="col-md-3 col-lg-3 grid-margin stretch-card">
			<div className="card">
				<div className="card-body">
					<img src="assets/images/restaurantTable.png" alt="restaurant" className="img-fluid" />
					<div className="row">
						<div className="col-8">
							<p className="display-4 mt-3" style={{ fontSize: "1.5rem" }}>
								Table {number}
							</p>
						</div>
						<div className="col-4">
							<button type="button" onClick={deleteHandler} className="btn btn-danger btn-rounded btn-icon float-right mt-3">
								<i className="mdi mdi-delete"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TableItem;
