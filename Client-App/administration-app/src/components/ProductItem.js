const ProductItem = () => {
	return (
		<div className="col-lg-12 portfolio-item filter-behaton">
			<hr />
			<div className="row ">
				<div className="col-8">
					<h2>Bataaak</h2>
					<p>Sastojak 1, sastojak 2, ....</p>
					<h4 style={{ color: "#198ae3" }}>RSD 2234,00</h4>
				</div>
				<div className="col-4 ">
					<a href="portfolio-details/portfolio-details2.html">
						<img src="assets/images/restaurantTable.png" className="img-fluid rounded" alt="" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
