import React from "react";


const HomePage = () => {
	const handleOnClickTapToStart = () => {
		window.location = "#/choose-order-type";
	}

	return (
		<React.Fragment>
			<div className="home-page-background align-items-center">
				<div className="col-md-12 p-0 bg-indigo h-md-100">
					<div className="row text-white d-md-flex align-items-center h-25 p-5 text-center justify-content-center">
						<h1 className="display-2 w-100">Dear Customer,</h1>
						<h1 className="display-2 ">Welcome to self ordering kiosk</h1>
					</div>
					<div className="text-white d-md-flex align-items-center h-25 p-5 text-center justify-content-center">
						<h1 className="align-items-top display-1">To start your order please tap to buttom bellow</h1>
					</div>
					<div className="text-white d-md-flex align-items-center h-30 p-5 text-center justify-content-center">
						<a onClick={() => handleOnClickTapToStart()} class="btn btn-circle mr-3 d-flex justify-content-center align-items-center" data-toggle="collapse" href="#/choose" aria-expanded="false" aria-controls="collapseExample">
							<div>
								Tap to start
								<br/>
								<img alt='' src="../assets/tap.png" href="#/choose-type" className="mt-4" height="90"/>
							</div>
						</a>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default HomePage;