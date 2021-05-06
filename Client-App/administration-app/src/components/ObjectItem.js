const ObjectItem = ({ imagePath, name }) => {
	return (
		<div className="col-md-3 grid-margin stretch-card">
			<div className="card">
				<div className="card-body">
					<img src={imagePath} alt="restaurant" className="img-fluid" />
					<h1 className="display-4 mt-4">{name}</h1>
				</div>
			</div>
		</div>
	);
};

export default ObjectItem;
