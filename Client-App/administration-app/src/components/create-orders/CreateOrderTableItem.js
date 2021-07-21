const CreateOrderTableItem = ({ number, handleTableSelect }) => {
	return (
		<div className="col-md-3 col-lg-3 grid-margin stretch-card" onClick={handleTableSelect} style={{ cursor: "pointer" }}>
			<div className="card">
				<div className="card-body">
					<img src="assets/images/restaurantTable.png" alt="restaurant" className="img-fluid w-100" />
					<div className="row">
						<p className="display-4 mt-3" style={{ fontSize: "1.5rem" }}>
							Table {number}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateOrderTableItem;
