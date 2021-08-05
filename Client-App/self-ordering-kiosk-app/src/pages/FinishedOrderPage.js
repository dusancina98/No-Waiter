import React, { useEffect} from "react";


const FinishedOrderPage = () => {

    useEffect(() => {
        setTimeout(() => {
            window.location = "#/home";
        }, 7000)
      }, [])
	return (
		<React.Fragment>
			<div className="home-page-background align-items-center">
				<div className="col-md-12 p-0 bg-indigo h-md-100">
					<div className="row text-white d-md-flex align-items-center h-25 p-5 text-center justify-content-center">
						<h1 className="display-2 w-100">Dear Customer,</h1>
						<h1 className="display-2 ">Your order created successfully</h1>
					</div>
					<div className="text-white d-md-flex align-items-center h-25 p-5 text-center justify-content-center">
						<h1 style={{'fontSize':'70px'}} className="align-items-top display-1">Please take your account below</h1>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default FinishedOrderPage;