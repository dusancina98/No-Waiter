const ObjectItem = ({ clickHandler, imagePath, name }) => {
	return (
		<div className="col-md-4 col-lg-3 grid-margin stretch-card" onClick={clickHandler}>
			<div className="card">
				<div className="card-body">
					<img src={imagePath} alt="restaurant" className="img-fluid" />
					<p className="display-4 mt-4" style={{ fontSize: "1.5rem" }}>
						{name}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ObjectItem;
