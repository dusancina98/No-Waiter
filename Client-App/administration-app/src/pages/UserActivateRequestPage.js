import React from "react";
import UserActivateRequest from "../components/authorizations/UserActivateRequest";
import UserContextProvider from "../contexts/UserContext";

const UserActivateRequestPage = (props) => {
	return (
		<React.Fragment>
			<div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100">
                        <UserContextProvider>
                            <UserActivateRequest id={props.match.params.id}/>
                        </UserContextProvider>
			        </div>
		        </div>
	        </div>
		</React.Fragment>
	);
};

export default UserActivateRequestPage;