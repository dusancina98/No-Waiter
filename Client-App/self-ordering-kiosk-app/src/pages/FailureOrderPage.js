import React, { useEffect} from "react";


const FailureOrderPage = () => {

    useEffect(() => {
        setTimeout(() => {
            window.location = "#/home";
        }, 10000)
      }, [])
      
	return (
		<React.Fragment>
			<div className="home-page-background align-items-center">
				<div className="col-md-12 p-0 bg-indigo h-md-100">
					<div className="row text-white d-md-flex align-items-center h-25 p-5 text-center justify-content-center">
					</div>
                    <div className="row text-white d-md-flex align-items-center h-25 p-5 text-center justify-content-center">
						<h1 className="display-1 w-100">Dear Customer,</h1>
						<h1 className="display-1 ">We have some problem, please contact waiters</h1>
					</div>

				</div>
			</div>
		</React.Fragment>
	);
};

export default FailureOrderPage;