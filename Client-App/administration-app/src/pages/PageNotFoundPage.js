import React from "react";
import { Link } from "react-router-dom";

const PageNotFoundPage = () => {
	return (
		<React.Fragment>
			<div className="limiter">

                <span className="login100-form-title p-t-66">
                    <img src="assets/images/404errorMessage.jpg" alt="Error message"/>
                </span>
                <span className="login100-form-title p-t-25 p-b-6">
						ERROR
				</span>
                <span className="login100-form-text p-b-36">
						Page not found
				</span>
                <div class="wrap-login100-form-btn" style={{width: "20em"}}>
						<div class="login100-form-bgbtn"></div>
						<Link className="login100-form-btn" to="/">
							Back to home page
					    </Link>
					</div>                
	        </div>
		</React.Fragment>
	);
};

export default PageNotFoundPage;