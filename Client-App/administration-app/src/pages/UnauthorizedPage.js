import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
	return (
		<React.Fragment>
			<div className="limiter">
				<span className="login100-form-title p-t-66">
					<img src="assets/images/unauthorized.png" alt="Unauthorized" />
				</span>
				<div class="wrap-login100-form-btn" style={{ width: "20em" }}>
					<div class="login100-form-bgbtn"></div>
					<Link className="login100-form-btn" to="/login">
						Back to login page
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
};

export default UnauthorizedPage;
